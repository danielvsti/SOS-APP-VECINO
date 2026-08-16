package cl.vsti.sosvecino;

import androidx.annotation.NonNull;

import com.capacitorjs.plugins.pushnotifications.MessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class SafeCallMessagingService extends MessagingService {
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        if ("VOICE_INCOMING".equals(remoteMessage.getData().get("type"))) {
            SafeCallNotification.show(this, remoteMessage, "Llamada segura de QUELTU");
        }
    }
}
