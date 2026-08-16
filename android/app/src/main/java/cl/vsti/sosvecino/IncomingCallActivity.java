package cl.vsti.sosvecino;

import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

public class IncomingCallActivity extends Activity {
    private Ringtone ringtone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        configureLockScreen();
        setContentView(buildContent());
        startRinging();
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected void onDestroy() {
        stopRinging();
        super.onDestroy();
    }

    private void configureLockScreen() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true);
            setTurnScreenOn(true);
            KeyguardManager keyguardManager =
                    (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
            keyguardManager.requestDismissKeyguard(this, null);
        } else {
            getWindow().addFlags(
                    WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                            | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
                            | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
            );
        }
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        getWindow().setStatusBarColor(Color.rgb(15, 21, 28));
    }

    private View buildContent() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setGravity(Gravity.CENTER);
        root.setPadding(dp(28), dp(48), dp(28), dp(36));
        root.setBackgroundColor(Color.rgb(15, 21, 28));

        TextView brand = label("QUELTU", 23, Color.WHITE, Typeface.BOLD);
        brand.setLetterSpacing(0.18f);
        root.addView(brand);

        TextView icon = label("☎", 74, Color.WHITE, Typeface.NORMAL);
        LinearLayout.LayoutParams iconParams = params(-2, -2);
        iconParams.topMargin = dp(70);
        root.addView(icon, iconParams);

        TextView title = label("Llamada segura entrante", 30, Color.WHITE, Typeface.BOLD);
        title.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams titleParams = params(-1, -2);
        titleParams.topMargin = dp(24);
        root.addView(title, titleParams);

        TextView detail = label(
                "La central necesita comunicarse contigo por un caso activo.",
                18,
                Color.rgb(206, 216, 230),
                Typeface.NORMAL
        );
        detail.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams detailParams = params(-1, -2);
        detailParams.topMargin = dp(16);
        detailParams.bottomMargin = dp(68);
        root.addView(detail, detailParams);

        LinearLayout actions = new LinearLayout(this);
        actions.setOrientation(LinearLayout.HORIZONTAL);
        actions.setGravity(Gravity.CENTER);

        Button reject = actionButton("Rechazar", Color.rgb(197, 45, 53));
        reject.setOnClickListener(view -> dismissCall());
        actions.addView(reject, weightedParams());

        Button answer = actionButton("Atender", Color.rgb(13, 164, 83));
        answer.setOnClickListener(view -> openCall());
        LinearLayout.LayoutParams answerParams = weightedParams();
        answerParams.leftMargin = dp(14);
        actions.addView(answer, answerParams);

        root.addView(actions, params(-1, dp(62)));
        return root;
    }

    private void openCall() {
        stopRinging();
        int notificationId = getIntent().getIntExtra(
                SafeCallNotification.EXTRA_NOTIFICATION_ID,
                0
        );
        SafeCallNotification.cancel(this, notificationId);
        SafeCallPlugin.persistPendingAction(this, getIntent().getExtras(), "ANSWER");
        SafeCallPlugin.openMainActivity(this);
        finish();
    }

    private void dismissCall() {
        stopRinging();
        int notificationId = getIntent().getIntExtra(
                SafeCallNotification.EXTRA_NOTIFICATION_ID,
                0
        );
        SafeCallNotification.cancel(this, notificationId);
        SafeCallPlugin.persistPendingAction(this, getIntent().getExtras(), "REJECT");
        SafeCallPlugin.openMainActivity(this);
        finish();
    }

    private void startRinging() {
        try {
            ringtone = RingtoneManager.getRingtone(
                    this,
                    RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE)
            );
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) ringtone.setLooping(true);
            ringtone.play();
        } catch (Exception ignored) {
            ringtone = null;
        }
    }

    private void stopRinging() {
        if (ringtone != null && ringtone.isPlaying()) ringtone.stop();
    }

    private TextView label(String text, int sp, int color, int style) {
        TextView view = new TextView(this);
        view.setText(text);
        view.setTextSize(sp);
        view.setTextColor(color);
        view.setTypeface(Typeface.DEFAULT, style);
        return view;
    }

    private Button actionButton(String text, int color) {
        Button button = new Button(this);
        button.setText(text);
        button.setTextColor(Color.WHITE);
        button.setTextSize(17);
        button.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        GradientDrawable background = new GradientDrawable();
        background.setColor(color);
        background.setCornerRadius(dp(18));
        button.setBackground(background);
        return button;
    }

    private LinearLayout.LayoutParams params(int width, int height) {
        return new LinearLayout.LayoutParams(width, height);
    }

    private LinearLayout.LayoutParams weightedParams() {
        return new LinearLayout.LayoutParams(0, -1, 1f);
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }
}
