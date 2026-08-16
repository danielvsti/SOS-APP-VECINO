package cl.vsti.sosvecino;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SafeCall")
public class SafeCallPlugin extends Plugin {
    private static final String PREFERENCES = "queltu_safe_call";
    private static final String ACTION = "native_call_action";
    private static final String[] DATA_KEYS = {
            "type",
            "ticket_id",
            "event_id",
            "voice_session_id",
            "title",
            "body"
    };
    private static SafeCallPlugin instance;

    @Override
    public void load() {
        instance = this;
    }

    @Override
    protected void handleOnDestroy() {
        if (instance == this) instance = null;
    }

    static void persistPendingAction(Context context, Bundle extras, String action) {
        SharedPreferences.Editor editor =
                context.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE).edit();
        editor.clear();
        editor.putString(ACTION, action);
        editor.putLong("received_at", System.currentTimeMillis());
        for (String key : DATA_KEYS) {
            String value = extras == null ? null : extras.getString(key);
            if (value != null) editor.putString(key, value);
        }
        editor.apply();
        dispatchIfListening(context);
    }

    static void openMainActivity(Context context) {
        Intent appIntent = new Intent(context, MainActivity.class);
        appIntent.addFlags(
                Intent.FLAG_ACTIVITY_CLEAR_TOP
                        | Intent.FLAG_ACTIVITY_SINGLE_TOP
                        | Intent.FLAG_ACTIVITY_NEW_TASK
        );
        context.startActivity(appIntent);
    }

    @PluginMethod
    public void getPendingAction(PluginCall call) {
        SharedPreferences preferences =
                getContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        JSObject result = pendingAction(preferences);
        if (result.has("native_call_action")) preferences.edit().clear().apply();
        call.resolve(result);
    }

    private static void dispatchIfListening(Context context) {
        SafeCallPlugin plugin = instance;
        if (plugin == null || !plugin.hasListeners("safeCallAction")) return;
        SharedPreferences preferences =
                context.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
        JSObject result = pendingAction(preferences);
        if (!result.has("native_call_action")) return;
        preferences.edit().clear().apply();
        plugin.notifyListeners("safeCallAction", result);
    }

    private static JSObject pendingAction(SharedPreferences preferences) {
        JSObject result = new JSObject();
        String action = preferences.getString(ACTION, null);
        if (action == null) return result;

        result.put("native_call_action", action);
        result.put("received_at", preferences.getLong("received_at", 0));
        for (String key : DATA_KEYS) {
            String value = preferences.getString(key, null);
            if (value != null) result.put(key, value);
        }
        return result;
    }
}
