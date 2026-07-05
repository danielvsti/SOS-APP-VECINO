package cl.vsti.sosvecino;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.PermissionRequest;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "SOSMEDIA";
    private static final int MEDIA_PERMISSIONS_REQUEST = 5007;

    private PermissionRequest pendingPermissionRequest;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.d(TAG, "MainActivity onCreate");

        if (getBridge() == null || getBridge().getWebView() == null) {
            Log.e(TAG, "Bridge/WebView not ready");
            return;
        }

        getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);

        getBridge().getWebView().setWebChromeClient(new BridgeWebChromeClient(getBridge()) {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    Log.d(TAG, "onPermissionRequest origin=" + request.getOrigin()
                            + " resources=" + Arrays.toString(request.getResources()));

                    if (needsRuntimePermission(request)) {
                        Log.d(TAG, "Runtime permission missing. Requesting Android permissions...");
                        pendingPermissionRequest = request;
                        requestAndroidMediaPermissions();
                        return;
                    }

                    grantWebViewMediaRequest(request);
                });
            }

            @Override
            public void onPermissionRequestCanceled(PermissionRequest request) {
                Log.d(TAG, "onPermissionRequestCanceled");
                if (pendingPermissionRequest == request) {
                    pendingPermissionRequest = null;
                }
                super.onPermissionRequestCanceled(request);
            }
        });

        requestAndroidMediaPermissions();
    }

    private boolean hasPermission(String permission) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return true;
        }
        return checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED;
    }

    private boolean needsRuntimePermission(PermissionRequest request) {
        for (String resource : request.getResources()) {
            if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)
                    && !hasPermission(Manifest.permission.RECORD_AUDIO)) {
                return true;
            }

            if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(resource)
                    && !hasPermission(Manifest.permission.CAMERA)) {
                return true;
            }
        }

        return false;
    }

    private void requestAndroidMediaPermissions() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return;
        }

        List<String> missing = new ArrayList<>();

        if (!hasPermission(Manifest.permission.RECORD_AUDIO)) {
            missing.add(Manifest.permission.RECORD_AUDIO);
        }

        if (!hasPermission(Manifest.permission.CAMERA)) {
            missing.add(Manifest.permission.CAMERA);
        }

        if (!missing.isEmpty()) {
            Log.d(TAG, "Requesting runtime permissions: " + missing);
            requestPermissions(missing.toArray(new String[0]), MEDIA_PERMISSIONS_REQUEST);
        } else {
            Log.d(TAG, "Runtime media permissions already granted");
        }
    }

    private void grantWebViewMediaRequest(PermissionRequest request) {
        List<String> allowed = new ArrayList<>();

        for (String resource : request.getResources()) {
            if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)
                    && hasPermission(Manifest.permission.RECORD_AUDIO)) {
                allowed.add(resource);
            }

            if (PermissionRequest.RESOURCE_VIDEO_CAPTURE.equals(resource)
                    && hasPermission(Manifest.permission.CAMERA)) {
                allowed.add(resource);
            }
        }

        try {
            if (!allowed.isEmpty()) {
                Log.d(TAG, "Granting WebView media resources: " + allowed);
                request.grant(allowed.toArray(new String[0]));
            } else {
                Log.w(TAG, "Denying WebView media request. No allowed resources.");
                request.deny();
            }
        } catch (Exception e) {
            Log.e(TAG, "Error resolving PermissionRequest", e);
        }
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode,
            String[] permissions,
            int[] grantResults
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode != MEDIA_PERMISSIONS_REQUEST) {
            return;
        }

        Log.d(TAG, "onRequestPermissionsResult permissions="
                + Arrays.toString(permissions)
                + " results="
                + Arrays.toString(grantResults));

        if (pendingPermissionRequest != null) {
            PermissionRequest request = pendingPermissionRequest;
            pendingPermissionRequest = null;
            grantWebViewMediaRequest(request);
        }
    }
}
