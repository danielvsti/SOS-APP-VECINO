package cl.vsti.sosvecino;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

final class SafeCallNotification {
    static final String CHANNEL_ID = "sos_calls";
    static final String EXTRA_NOTIFICATION_ID = "sos_call_notification_id";

    private SafeCallNotification() {}

    static void show(Context context, RemoteMessage message, String defaultTitle) {
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        ensureChannel(manager);

        Bundle extras = messageExtras(message);
        String sessionId = value(extras, "voice_session_id", message.getMessageId());
        int notificationId = notificationId(sessionId);
        extras.putInt(EXTRA_NOTIFICATION_ID, notificationId);

        String title = message.getNotification() != null
                ? message.getNotification().getTitle()
                : value(extras, "title", defaultTitle);
        String body = message.getNotification() != null
                ? message.getNotification().getBody()
                : value(
                        extras,
                        "body",
                        "La central necesita comunicarse contigo por un caso activo."
                );

        Intent fullScreenIntent = new Intent(context, IncomingCallActivity.class);
        fullScreenIntent.putExtras(extras);
        fullScreenIntent.addFlags(
                Intent.FLAG_ACTIVITY_NEW_TASK
                        | Intent.FLAG_ACTIVITY_CLEAR_TOP
                        | Intent.FLAG_ACTIVITY_SINGLE_TOP
        );

        PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(
                context,
                notificationId,
                fullScreenIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Intent rejectIntent = new Intent(context, RejectCallReceiver.class);
        rejectIntent.putExtras(extras);
        rejectIntent.putExtra(EXTRA_NOTIFICATION_ID, notificationId);
        PendingIntent rejectPendingIntent = PendingIntent.getBroadcast(
                context,
                notificationId,
                rejectIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Uri sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setContentText(body)
                .setCategory(NotificationCompat.CATEGORY_CALL)
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setOngoing(true)
                .setAutoCancel(false)
                .setSound(sound)
                .setVibrate(new long[]{0, 700, 350, 700, 350, 700})
                .setContentIntent(fullScreenPendingIntent)
                .setFullScreenIntent(fullScreenPendingIntent, true)
                .addAction(0, "Rechazar", rejectPendingIntent)
                .addAction(0, "Atender", fullScreenPendingIntent);

        manager.notify(notificationId, builder.build());
    }

    static void cancel(Context context, int notificationId) {
        NotificationManager manager =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        manager.cancel(notificationId);
    }

    private static void ensureChannel(NotificationManager manager) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;

        Uri sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
                .build();
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Llamadas seguras QUELTU",
                NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("Llamadas seguras relacionadas con una emergencia activa");
        channel.enableVibration(true);
        channel.setVibrationPattern(new long[]{0, 700, 350, 700, 350, 700});
        channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_PUBLIC);
        channel.setSound(sound, audioAttributes);
        manager.createNotificationChannel(channel);
    }

    private static Bundle messageExtras(RemoteMessage message) {
        Bundle extras = new Bundle();
        if (message.getMessageId() != null) {
            extras.putString("google.message_id", message.getMessageId());
        }
        for (Map.Entry<String, String> entry : message.getData().entrySet()) {
            extras.putString(entry.getKey(), entry.getValue());
        }
        return extras;
    }

    private static String value(Bundle extras, String key, String fallback) {
        String result = extras.getString(key);
        return result == null || result.isBlank() ? fallback : result;
    }

    private static int notificationId(String value) {
        int hash = value == null ? 9201 : value.hashCode();
        return hash == Integer.MIN_VALUE ? 9201 : Math.abs(hash);
    }
}
