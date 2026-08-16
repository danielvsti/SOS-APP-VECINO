package cl.vsti.sosvecino;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class RejectCallReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        int notificationId = intent.getIntExtra(SafeCallNotification.EXTRA_NOTIFICATION_ID, 0);
        SafeCallNotification.cancel(context, notificationId);
        SafeCallPlugin.persistPendingAction(context, intent.getExtras(), "REJECT");
        SafeCallPlugin.openMainActivity(context);
    }
}
