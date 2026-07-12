const SOS_CONFIG = window.SOS_CONFIG || {};
const API = SOS_CONFIG.API_BASE || "https://sos.vsti.cl";
const NEIGHBOR_TOKEN_KEY = "sos_neighbor_session_token";
const NEIGHBOR_SETTINGS_KEY = "sos_neighbor_platform_settings";
const nativeFetch = window.fetch.bind(window);
window.fetch = (input, options = {}) => {
  const url = typeof input === "string" ? input : input?.url || "";
  const token = localStorage.getItem(NEIGHBOR_TOKEN_KEY) || "";
  if (!token || !String(url).startsWith(API)) return nativeFetch(input, options);
  const headers = new Headers(options.headers || (typeof input !== "string" ? input?.headers : undefined) || {});
  if (!headers.has("Authorization")) headers.set("Authorization", `Bearer ${token}`);
  return nativeFetch(input, { ...options, headers });
};
const IS_APP_STANDALONE =
  window.matchMedia?.("(display-mode: standalone)")?.matches === true ||
  window.navigator.standalone === true ||
  Boolean(window.Capacitor?.isNativePlatform?.());

document.documentElement.classList.toggle("app-standalone", IS_APP_STANDALONE);

let userId = localStorage.getItem("user_id");
let neighborProfile = JSON.parse(localStorage.getItem("neighbor_profile") || "null");
if (neighborProfile && !localStorage.getItem(NEIGHBOR_TOKEN_KEY)) {
  userId = null;
  neighborProfile = null;
  localStorage.removeItem("user_id");
  localStorage.removeItem("neighbor_profile");
}
let homeLatitude = localStorage.getItem("neighbor_home_latitude") || null;
let homeLongitude = localStorage.getItem("neighbor_home_longitude") || null;
let homeAccuracy = localStorage.getItem("neighbor_home_accuracy") || null;
let neighborPlatformSettings = JSON.parse(localStorage.getItem(NEIGHBOR_SETTINGS_KEY) || "null");

const homePanel = document.getElementById("homePanel");
const resumeFollowupCard = document.getElementById("resumeFollowupCard");
const resumeTicketId = document.getElementById("resumeTicketId");
const resumeCaseStatus = document.getElementById("resumeCaseStatus");
const resumeFollowupButton = document.getElementById("resumeFollowupButton");
const categoryPanel = document.getElementById("categoryPanel");
const categoryFeedback = document.getElementById("categoryFeedback");
const activePanel = document.getElementById("activePanel");
const textPanel = document.getElementById("textPanel");
const audioPanel = document.getElementById("audioPanel");
const recordingBanner = document.getElementById("recordingBanner");
const recordingTimer = document.getElementById("recordingTimer");
const audioInlineTimer = document.getElementById("audioInlineTimer");
const incomingCallPanel = document.getElementById("incomingCallPanel");
const incomingCallIcon = document.getElementById("incomingCallIcon");
const incomingCallTitle = document.getElementById("incomingCallTitle");
const incomingCallText = document.getElementById("incomingCallText");

const authPanel = document.getElementById("authPanel");
const loginBlock = document.getElementById("loginBlock");
const registerBlock = document.getElementById("registerBlock");
const otpBlock = document.getElementById("otpBlock");
const otpHelpText = document.getElementById("otpHelpText");
const otpCode = document.getElementById("otpCode");
const otpDemoCode = document.getElementById("otpDemoCode");
const requestCodeButton = document.getElementById("requestCodeButton");
const showRegisterButton = document.getElementById("showRegisterButton");
const backToLoginButton = document.getElementById("backToLoginButton");
const verifyCodeButton = document.getElementById("verifyCodeButton");
const resendCodeButton = document.getElementById("resendCodeButton");
const otpBackButton = document.getElementById("otpBackButton");
const profilePanel = document.getElementById("profilePanel");
const profileName = document.getElementById("profileName");
const profileMeta = document.getElementById("profileMeta");
const regFullName = document.getElementById("regFullName");
const regPhone = document.getElementById("regPhone");
const regRut = document.getElementById("regRut");
const regEmail = document.getElementById("regEmail");
const regAddress = document.getElementById("regAddress");
const homeLocationButton = document.getElementById("homeLocationButton");
const homeLocationStatus = document.getElementById("homeLocationStatus");
const contact1Name = document.getElementById("contact1Name");
const contact1Phone = document.getElementById("contact1Phone");
const contact1Relation = document.getElementById("contact1Relation");
const contact2Name = document.getElementById("contact2Name");
const contact2Phone = document.getElementById("contact2Phone");
const contact2Relation = document.getElementById("contact2Relation");
const registerButton = document.getElementById("registerButton");
const loginPhone = document.getElementById("loginPhone");
const loginButton = document.getElementById("loginButton"); // legacy fallback
const editProfileButton = document.getElementById("editProfileButton");
const logoutButton = document.getElementById("logoutButton");

const sosButton = document.getElementById("sosButton");
const confirmButton = document.getElementById("confirmButton");
const backButton = document.getElementById("backButton");
const cancelButton = document.getElementById("cancelButton");
const leaveFollowupButton = document.getElementById("leaveFollowupButton");
const voiceButton = document.getElementById("voiceButton");
const voiceSessionPanel = document.getElementById("voiceSessionPanel");
const voiceSessionTitle = document.getElementById("voiceSessionTitle");
const voiceSessionStatus = document.getElementById("voiceSessionStatus");
const voiceCallTimer = document.getElementById("voiceCallTimer");
const voiceConnectButton = document.getElementById("voiceConnectButton");
const voiceMuteButton = document.getElementById("voiceMuteButton");
const voiceHangupButton = document.getElementById("voiceHangupButton");
const voiceRemoteAudio = document.getElementById("voiceRemoteAudio");
const textButton = document.getElementById("textButton");
const audioButton = document.getElementById("audioButton");
const videoCallButton = document.getElementById("videoCallButton");
const videoUploadButton = document.getElementById("videoUploadButton");
const videoInput = document.getElementById("videoInput");
const sendTextButton = document.getElementById("sendTextButton");
const stopAudioButton = document.getElementById("stopAudioButton");
const acceptCallButton = document.getElementById("acceptCallButton");
const rejectCallButton = document.getElementById("rejectCallButton");

const textMessage = document.getElementById("textMessage");
const audioStatus = document.getElementById("audioStatus");

const gpsStatus = document.getElementById("gpsStatus");
const accuracyLabel = document.getElementById("accuracy");
const eventStatus = document.getElementById("eventStatus");
const statusLabel = document.getElementById("status");
const eventIdLabel = document.getElementById("eventId");
const ticketIdLabel = document.getElementById("ticketId");
const ticketIdShortLabel = document.getElementById("ticketIdShort");
const caseTypeCard = document.getElementById("caseTypeCard");
const caseTypeIcon = document.getElementById("caseTypeIcon");
const caseTypeTitle = document.getElementById("caseTypeTitle");
const caseProgressIcon = document.getElementById("caseProgressIcon");
const caseProgressTitle = document.getElementById("caseProgressTitle");
const caseProgressDetail = document.getElementById("caseProgressDetail");
const caseProgressSteps = document.getElementById("caseProgressSteps");
const caseActivityList = document.getElementById("caseActivityList");
const caseActivityEmpty = document.getElementById("caseActivityEmpty");
const resolverContactCard = document.getElementById("resolverContactCard");
const resolverContactName = document.getElementById("resolverContactName");
const resolverContactText = document.getElementById("resolverContactText");
const resolverSecureCallButton = document.getElementById("resolverSecureCallButton");
const sensorToggleButton = document.getElementById("sensorToggleButton");
const sensorStatus = document.getElementById("sensorStatus");
const sensorSettingsButton = document.getElementById("sensorSettingsButton");
const sensorIndicatorText = document.getElementById("sensorIndicatorText");
const sensorSettingsPanel = document.getElementById("sensorSettingsPanel");
const closeSensorSettingsButton = document.getElementById("closeSensorSettingsButton");
const sensorTestButton = document.getElementById("sensorTestButton");
const fallConfirmPanel = document.getElementById("fallConfirmPanel");
const fallCountdown = document.getElementById("fallCountdown");
const fallOkButton = document.getElementById("fallOkButton");
const fallHelpButton = document.getElementById("fallHelpButton");

if (neighborProfile?.id && !userId) {
  userId = neighborProfile.id;
  localStorage.setItem("user_id", userId);
}

let currentEventId = localStorage.getItem("event_id");
let currentTicketId = localStorage.getItem("ticket_id");
let currentResolverName = null;
let followupMinimized = localStorage.getItem("followup_minimized") === "true";
let selectedAlertType = localStorage.getItem("current_alert_type") || "SOS_MANUAL";
let mediaRecorder = null;
let audioChunks = [];
let audioStream = null;
let recordingTimeout = null;
let recordingTimerInterval = null;
let recordingStartedAt = null;
let activeIncomingCall = null;
let secureVoice = createSecureVoiceState();
let persistentCallToneAudio = null;
let persistentCallToneUrl = null;
let callToneUnlocked = false;
let handledCallActionIds = JSON.parse(localStorage.getItem("handled_call_action_ids") || "[]");
let pendingOtpPhone = localStorage.getItem("pending_otp_phone") || null;
let pendingOtpPurpose = localStorage.getItem("pending_otp_purpose") || "LOGIN";
let pendingOtpMode = localStorage.getItem("pending_otp_mode") || "login";

const alertDefinitions = {
  SOS_MANUAL: {
    title: "SOS General",
    priority: 1
  },
  MEDICAL: {
    title: "Emergencia Médica",
    priority: 1
  },
  FIRE: {
    title: "Incendio",
    priority: 1
  },
  SECURITY: {
    title: "Seguridad Ciudadana",
    priority: 2
  },
  VIF: {
    title: "Violencia Intrafamiliar",
    priority: 1
  },
  VIF_SILENT_SHAKE: {
    title: "Alerta silenciosa VIF",
    priority: 1
  },
  FALL_DETECTED: {
    title: "Posible caída / emergencia médica",
    priority: 1
  },
  TRAFFIC_ACCIDENT: {
    title: "Accidente de Tránsito",
    priority: 2
  },
  URBAN_RISK: {
    title: "Riesgo Urbano",
    priority: 3
  },
  OTHER: {
    title: "Otro Incidente",
    priority: 3
  }
};

function applyNeighborEmergencyCategories(settings = neighborPlatformSettings) {
  const categories = settings?.neighbor_app?.emergency_categories;
  if (!Array.isArray(categories) || categories.length === 0) return false;

  const enabledByType = new Map(
    categories
      .filter((category) => category?.enabled !== false)
      .map((category) => [String(category.type || "").toUpperCase(), category])
  );

  document.querySelectorAll(".emergency-option").forEach((button) => {
    const type = String(button.dataset.type || "").toUpperCase();
    const category = enabledByType.get(type);
    button.hidden = !category;
    button.disabled = !category;
    if (!category) {
      button.classList.remove("active");
      return;
    }

    const icon = button.querySelector(".emoji");
    const label = button.querySelector("span:last-child");
    if (icon && category.icon) icon.textContent = category.icon;
    if (label) label.textContent = category.title_override || category.title || alertDefinitions[type]?.title || type;
    if (category.color) button.style.borderColor = category.color;
    if (alertDefinitions[type]) {
      alertDefinitions[type].title = category.title_override || category.title || alertDefinitions[type].title;
      alertDefinitions[type].priority = Number(category.priority || alertDefinitions[type].priority || 3);
    }
  });

  const selectedButton = document.querySelector(`.emergency-option[data-type="${selectedAlertType}"]`);
  if (!selectedButton || selectedButton.hidden) {
    const firstEnabled = document.querySelector(".emergency-option:not([hidden])");
    if (firstEnabled) selectedAlertType = normalizeAlertType(firstEnabled.dataset.type);
  }
  return enabledByType.size > 0;
}

async function refreshNeighborPlatformSettings() {
  try {
    const res = await fetch(`${API}/auth/session`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.status !== "ok" || !data.platform_settings) {
      throw new Error(data.message || "No se pudo cargar la configuración municipal");
    }
    neighborPlatformSettings = data.platform_settings;
    localStorage.setItem(NEIGHBOR_SETTINGS_KEY, JSON.stringify(neighborPlatformSettings));
    applyNeighborEmergencyCategories(neighborPlatformSettings);
    return neighborPlatformSettings;
  } catch (error) {
    console.warn("No se pudo actualizar la configuración municipal", error);
    applyNeighborEmergencyCategories(neighborPlatformSettings);
    return neighborPlatformSettings;
  }
}


function normalizeAlertType(type) {
  const raw = String(type || "SOS_MANUAL").toUpperCase();
  if (raw.includes("VIF")) return raw.includes("SILENT") ? "VIF_SILENT_SHAKE" : "VIF";
  if (raw.includes("FIRE") || raw.includes("INCEND")) return "FIRE";
  if (raw.includes("MED")) return "MEDICAL";
  if (raw.includes("SEC") || raw.includes("SEG")) return "SECURITY";
  if (raw.includes("FALL") || raw.includes("CAID")) return "FALL_DETECTED";
  if (raw.includes("ACCIDENT")) return "TRAFFIC_ACCIDENT";
  if (raw.includes("RISK") || raw.includes("RIESGO")) return "URBAN_RISK";
  if (raw.includes("OTHER") || raw.includes("OTRO")) return "OTHER";
  return raw in alertDefinitions ? raw : "SOS_MANUAL";
}

function alertTypeIcon(type) {
  const key = normalizeAlertType(type);
  return ({
    SOS_MANUAL: "🆘",
    MEDICAL: "🩺",
    FIRE: "🔥",
    SECURITY: "🛡️",
    VIF: "🤫",
    VIF_SILENT_SHAKE: "🤫",
    FALL_DETECTED: "⚕️",
    TRAFFIC_ACCIDENT: "🚧",
    URBAN_RISK: "⚠️",
    OTHER: "❓"
  })[key] || "🆘";
}

function alertTypeLabel(type) {
  const key = normalizeAlertType(type);
  return alertDefinitions[key]?.title || "SOS General";
}

function setCurrentAlertType(type) {
  selectedAlertType = normalizeAlertType(type);
  localStorage.setItem("current_alert_type", selectedAlertType);
  updateCaseTypeCard(selectedAlertType);
}

function updateCaseTypeCard(type = selectedAlertType) {
  const key = normalizeAlertType(type);
  if (caseTypeIcon) caseTypeIcon.textContent = alertTypeIcon(key);
  if (caseTypeTitle) caseTypeTitle.textContent = alertTypeLabel(key);
  if (caseTypeCard) caseTypeCard.className = `case-type-card case-type-${key.toLowerCase().replace(/_/g, "-")}`;
}

function normalizePhone(phone) {
  return String(phone || "").trim().replace(/\s+/g, "");
}

function getNeighborName() {
  return neighborProfile?.full_name || "Vecino SOS";
}

function getNeighborPhone() {
  return neighborProfile?.phone || null;
}

function getNeighborControlCenterCode() {
  return neighborProfile?.control_center_code || null;
}

function isNeighborRegistered() {
  return !!(userId && neighborProfile?.id);
}


function blurEditableControls() {
  const active = document.activeElement;
  if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) {
    try { active.blur(); } catch (_) {}
  }
  try { window.getSelection?.().removeAllRanges?.(); } catch (_) {}
}

function enterSensorGestureMode() {
  blurEditableControls();
  document.body.classList.add("sensor-gesture-mode");
}

function exitSensorGestureMode() {
  document.body.classList.remove("sensor-gesture-mode");
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && sensorsEnabled) {
    enterSensorGestureMode();
  }
});

function isNeighborAccountAllowed(profile = neighborProfile) {
  if (!profile) return false;

  const blockedStatuses = [
    "PENDING_VERIFICATION",
    "REJECTED",
    "SUSPENDED"
  ];

  return profile.is_active !== false && !blockedStatuses.includes(profile.validation_status);
}

function getNeighborBlockReason(profile = neighborProfile) {
  if (!profile) return "Debes ingresar nuevamente.";

  if (profile.is_active === false) {
    return "Tu cuenta está suspendida o inactiva. Contacta a la central municipal.";
  }

  if (profile.validation_status === "REJECTED") {
    return "Tu registro fue rechazado por la central municipal.";
  }

  if (profile.validation_status === "SUSPENDED") {
    return "Tu cuenta está suspendida por la central municipal.";
  }

  if (profile.validation_status === "PENDING_VERIFICATION") {
    return "Debes validar tu teléfono antes de usar SOS.";
  }

  return null;
}

function saveNeighborProfile(user) {
  neighborProfile = user;
  userId = user.id;
  localStorage.setItem("neighbor_profile", JSON.stringify(user));
  localStorage.setItem("user_id", user.id);
}

function clearNeighborProfile() {
  neighborProfile = null;
  userId = null;
  localStorage.removeItem("neighbor_profile");
  localStorage.removeItem("user_id");
  localStorage.removeItem(NEIGHBOR_TOKEN_KEY);
}

function updateProfileCard() {
  if (!neighborProfile) return;

  const status = neighborProfile.validation_status || "PROVISIONAL_ACTIVE";
  const activeText = neighborProfile.is_active === false ? "CUENTA SUSPENDIDA" : status;

  profileName.textContent = neighborProfile.full_name || "Vecino registrado";
  profileMeta.textContent = `${neighborProfile.phone || "sin teléfono"} · ${activeText}`;
}

async function refreshNeighborProfileFromServer(options = {}) {
  if (!userId) return false;

  try {
    const res = await fetch(`${API}/auth/me?user_id=${encodeURIComponent(userId)}`);
    const data = await res.json();

    if (!res.ok || data.status !== "ok") {
      throw new Error(data.message || "No se pudo actualizar perfil");
    }

    if (data.user) {
      saveNeighborProfile(data.user);
      updateProfileCard();
    }

    const allowed = data.can_use_sos !== false && isNeighborAccountAllowed(data.user);

    if (!allowed) {
      const message = data.block_reason || getNeighborBlockReason(data.user);
      statusLabel.textContent = "Cuenta no habilitada";

      if (options.alertOnBlocked) {
        alert(message || "Tu cuenta no está habilitada para generar SOS.");
      }
    }

    return allowed;
  } catch (error) {
    console.warn("No se pudo refrescar perfil del vecino", error);
    return isNeighborAccountAllowed();
  }
}

async function ensureNeighborCanUseSOS() {
  if (!isNeighborRegistered()) {
    showAuth();
    return false;
  }

  const allowed = await refreshNeighborProfileFromServer({ alertOnBlocked: true });

  if (!allowed) {
    showHome({ force: true });
    sosButton.disabled = true;
    return false;
  }

  sosButton.disabled = false;
  return true;
}

function fillRegisterFormFromProfile() {
  if (!neighborProfile) return;

  regFullName.value = neighborProfile.full_name || "";
  regPhone.value = neighborProfile.phone || "";
  regRut.value = neighborProfile.rut || "";
  regEmail.value = neighborProfile.email || "";
  regAddress.value = neighborProfile.declared_address || "";
  loginPhone.value = neighborProfile.phone || "";
}

function buildEmergencyContacts() {
  const contacts = [];

  if (contact1Name.value.trim() && contact1Phone.value.trim()) {
    contacts.push({
      name: contact1Name.value.trim(),
      phone: normalizePhone(contact1Phone.value),
      relationship: contact1Relation.value.trim() || "Contacto emergencia",
      priority: 1
    });
  }

  if (contact2Name.value.trim() && contact2Phone.value.trim()) {
    contacts.push({
      name: contact2Name.value.trim(),
      phone: normalizePhone(contact2Phone.value),
      relationship: contact2Relation.value.trim() || "Contacto emergencia",
      priority: 2
    });
  }

  return contacts;
}

function resetOtpDemo() {
  if (!otpDemoCode) return;
  otpDemoCode.hidden = true;
  otpDemoCode.textContent = "";
}

function showOtpDemoCode(code) {
  if (!otpDemoCode) return;

  const value = String(code || "").trim();
  if (!value) {
    resetOtpDemo();
    return;
  }

  otpDemoCode.hidden = false;
  otpDemoCode.textContent = `Código demo: ${value}`;
}

function showLogin() {
  homePanel.hidden = true;
  categoryPanel.hidden = true;
  activePanel.hidden = true;
  profilePanel.hidden = true;
  authPanel.hidden = false;
  loginBlock.hidden = false;
  registerBlock.hidden = true;
  otpBlock.hidden = true;
  cancelButton.hidden = true;
  resetOtpDemo();
  statusLabel.textContent = "Ingresa con tu teléfono registrado";
  fillRegisterFormFromProfile();
}

function showRegister() {
  homePanel.hidden = true;
  categoryPanel.hidden = true;
  activePanel.hidden = true;
  profilePanel.hidden = true;
  authPanel.hidden = false;
  loginBlock.hidden = true;
  registerBlock.hidden = false;
  otpBlock.hidden = true;
  cancelButton.hidden = true;
  resetOtpDemo();
  statusLabel.textContent = "Registro de vecino";
  fillRegisterFormFromProfile();
}

function showOtp({
 phone, purpose = "LOGIN", mode = "login", demoCode = null } = {}) {
  pendingOtpPhone = normalizePhone(phone || pendingOtpPhone);
  pendingOtpPurpose = purpose || pendingOtpPurpose || "LOGIN";
  pendingOtpMode = mode || pendingOtpMode || "login";

  localStorage.setItem("pending_otp_phone", pendingOtpPhone);
  localStorage.setItem("pending_otp_purpose", pendingOtpPurpose);
  localStorage.setItem("pending_otp_mode", pendingOtpMode);

  homePanel.hidden = true;
  categoryPanel.hidden = true;
  activePanel.hidden = true;
  profilePanel.hidden = true;
  authPanel.hidden = false;
  loginBlock.hidden = true;
  registerBlock.hidden = true;
  otpBlock.hidden = false;
  cancelButton.hidden = true;
  otpCode.value = "";
  otpHelpText.textContent = `Ingresa el código enviado a ${pendingOtpPhone}.`;
  showOtpDemoCode(demoCode);
  statusLabel.textContent = "Código enviado";
  setTimeout(() => otpCode.focus(), 100);
}

function showAuth() {
  showLogin();
}

async function requestLoginCode() {
  const phone = normalizePhone(loginPhone.value || regPhone.value);

  if (!phone) {
    alert("Ingresa el teléfono registrado.");
    return;
  }

  requestCodeButton.disabled = true;
  statusLabel.textContent = "Enviando código...";

  try {
    const res = await fetch(`${API}/auth/request-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        purpose: "LOGIN"
      })
    });

    const data = await res.json();

    if (!res.ok || data.status !== "ok") {
      throw new Error(data.message || "No se pudo enviar el código");
    }

    showOtp({
      phone,
      purpose: "LOGIN",
      mode: "login",
      demoCode: data.demo_code || null
    });
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo enviar el código";
    alert(error.message || "No se pudo enviar el código");
  } finally {
    requestCodeButton.disabled = false;
  }
}

async function registerNeighbor() {
  const fullName = regFullName.value.trim();
  const phone = normalizePhone(regPhone.value);
  const declaredAddress = regAddress.value.trim();

  if (!fullName || !phone || !declaredAddress) {
    alert("Completa nombre, teléfono y dirección.");
    return;
  }

  registerButton.disabled = true;
  statusLabel.textContent = "Registrando y enviando código...";

  try {
    if (!homeLatitude || !homeLongitude) {
      statusLabel.textContent = "Obteniendo ubicación GPS para asignar tu Centro de Control...";
      homeLocationStatus.textContent = "Obteniendo GPS para asignar Centro de Control...";
      const position = await getCurrentPosition();
      homeLatitude = String(position.coords.latitude);
      homeLongitude = String(position.coords.longitude);
      homeAccuracy = String(Math.round(position.coords.accuracy));

      localStorage.setItem("neighbor_home_latitude", homeLatitude);
      localStorage.setItem("neighbor_home_longitude", homeLongitude);
      localStorage.setItem("neighbor_home_accuracy", homeAccuracy);
      homeLocationStatus.textContent = `GPS OK para zona municipal · precisión ${homeAccuracy} m`;
    }

    const payload = {
      full_name: fullName,
      rut: regRut.value.trim() || null,
      phone,
      email: regEmail.value.trim() || null,
      declared_address: declaredAddress,
      latitude: homeLatitude ? Number(homeLatitude) : null,
      longitude: homeLongitude ? Number(homeLongitude) : null,
      emergency_contacts: buildEmergencyContacts()
    };

    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || data.status !== "ok") {
      throw new Error(data.message || "No se pudo registrar");
    }

    const assignedCenter = data.assignment?.control_center_name || data.user?.control_center_name || "tu Centro de Control";
    statusLabel.textContent = `Registro recibido en ${assignedCenter}. Valida el código.`;
    showOtp({
      phone,
      purpose: "REGISTER",
      mode: "register",
      demoCode: data.demo_code || null
    });
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo registrar el vecino";
    alert(error.message || "No se pudo registrar. Activa la ubicación GPS y vuelve a intentarlo.");
  } finally {
    registerButton.disabled = false;
  }
}

async function verifyOtpCode() {
  const phone = normalizePhone(pendingOtpPhone || loginPhone.value || regPhone.value);
  const code = String(otpCode.value || "").trim();

  if (!phone || !code) {
    alert("Ingresa el código recibido.");
    return;
  }

  verifyCodeButton.disabled = true;
  statusLabel.textContent = "Validando código...";

  try {
    const res = await fetch(`${API}/auth/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        code,
        purpose: pendingOtpPurpose || null
      })
    });

    const data = await res.json();

    if (!res.ok || data.status !== "ok") {
      throw new Error(data.message || "Código inválido");
    }

    if (data.user.role !== "NEIGHBOR") {
      throw new Error("Este usuario no tiene perfil de vecino.");
    }

    localStorage.setItem(NEIGHBOR_TOKEN_KEY, data.token);
    saveNeighborProfile(data.user);
    updateProfileCard();
    localStorage.removeItem("pending_otp_phone");
    localStorage.removeItem("pending_otp_purpose");
    localStorage.removeItem("pending_otp_mode");
    resetOtpDemo();
    statusLabel.textContent = `Bienvenido/a, ${data.user.full_name}`;
    await recoverActiveCase();
    showHome({ force: true });
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo validar el código";
    alert(error.message || "No se pudo validar el código");
  } finally {
    verifyCodeButton.disabled = false;
  }
}

async function resendOtpCode() {
  const phone = normalizePhone(pendingOtpPhone || loginPhone.value || regPhone.value);

  if (!phone) {
    showLogin();
    return;
  }

  resendCodeButton.disabled = true;
  statusLabel.textContent = "Reenviando código...";

  try {
    if (pendingOtpMode === "register") {
      await registerNeighbor();
      return;
    }

    const res = await fetch(`${API}/auth/request-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        purpose: pendingOtpPurpose || "LOGIN"
      })
    });

    const data = await res.json();

    if (!res.ok || data.status !== "ok") {
      throw new Error(data.message || "No se pudo reenviar el código");
    }

    showOtp({
      phone,
      purpose: pendingOtpPurpose || "LOGIN",
      mode: pendingOtpMode || "login",
      demoCode: data.demo_code || null
    });
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo reenviar el código";
    alert(error.message || "No se pudo reenviar el código");
  } finally {
    resendCodeButton.disabled = false;
  }
}

async function loginNeighbor() {
  return requestLoginCode();
}

async function useHomeLocation() {
  homeLocationButton.disabled = true;
  homeLocationStatus.textContent = "Obteniendo GPS para asignar Centro de Control...";

  try {
    const position = await getCurrentPosition();
    homeLatitude = String(position.coords.latitude);
    homeLongitude = String(position.coords.longitude);
    homeAccuracy = String(Math.round(position.coords.accuracy));

    localStorage.setItem("neighbor_home_latitude", homeLatitude);
    localStorage.setItem("neighbor_home_longitude", homeLongitude);
    localStorage.setItem("neighbor_home_accuracy", homeAccuracy);

    homeLocationStatus.textContent = `GPS OK para zona municipal · precisión ${homeAccuracy} m`;
  } catch (error) {
    console.error(error);
    homeLocationStatus.textContent = "No se pudo obtener GPS para validar zona municipal";
  } finally {
    homeLocationButton.disabled = false;
  }
}

function shortTicketId(ticketId) {
  if (!ticketId) return "-";
  return "#" + String(ticketId).slice(0, 8).toUpperCase();
}

function updateTicketLabels() {
  ticketIdLabel.textContent = currentTicketId || "-";
  ticketIdShortLabel.textContent = shortTicketId(currentTicketId);
}


function linkedIncidentStatusText(data) {
  const count = Number(data?.report_count || 0);
  if (!data?.incident_linked) return null;
  return count > 1
    ? `Incidente ya reportado · tu información fue sumada · ${count} reportes ciudadanos`
    : "Incidente ya reportado · tu información fue sumada al caso activo";
}

function renderLinkedIncidentProgress(data) {
  if (!data?.incident_linked) return;
  const count = Number(data.report_count || 0);
  renderCaseProgress({
    ticket_state: "ACTIVE",
    report_count: count,
    is_primary_report: false,
    headline: "Tu reporte fue sumado a un caso activo.",
    detail: count > 1
      ? `Este incidente ya estaba siendo gestionado. Ahora acumula ${count} reportes ciudadanos.`
      : "Este incidente ya estaba siendo gestionado. Sumamos tu información para ayudar a la central.",
    resolver: null,
    steps: [
      {
        label: "Caso ya reportado",
        detail: "La central ya estaba gestionando este incidente.",
        done: true,
        active: false
      },
      {
        label: "Tu información fue agregada",
        detail: "Tus datos, ubicación y antecedentes quedaron asociados al caso activo.",
        done: true,
        active: true
      }
    ]
  });
}

function setFollowupMinimized(value) {
  followupMinimized = value === true;

  if (followupMinimized) {
    localStorage.setItem("followup_minimized", "true");
  } else {
    localStorage.removeItem("followup_minimized");
  }
}

function updateResumeFollowupCard(stateText = null) {
  if (!resumeFollowupCard) return;

  if (!currentEventId && !currentTicketId) {
    resumeFollowupCard.hidden = true;
    return;
  }

  resumeTicketId.textContent = shortTicketId(currentTicketId);
  resumeCaseStatus.textContent = stateText || "Caso en seguimiento";
  resumeFollowupCard.hidden = false;
}

function clearCurrentCaseLocal() {
  resetSecureVoiceState();
  currentEventId = null;
  currentTicketId = null;
  setFollowupMinimized(false);
  localStorage.removeItem("event_id");
  localStorage.removeItem("ticket_id");
  localStorage.removeItem("current_alert_type");
  selectedAlertType = "SOS_MANUAL";
  updateCaseTypeCard(selectedAlertType);
  eventIdLabel.textContent = "-";
  eventStatus.textContent = "NORMAL";
  updateTicketLabels();
  updateResumeFollowupCard();
}

function stateToProgressIcon(state) {
  switch (state) {
    case "ASSIGNED":
    case "ACCEPTED_BY_RESOLVER":
      return "👮";
    case "EN_ROUTE":
      return "🚗";
    case "ON_SITE":
      return "📍";
    case "RESOLVED":
    case "CLOSED":
      return "✅";
    case "CANCELLED":
      return "⚪";
    default:
      return "✅";
  }
}

function renderCaseProgress(progress) {
  if (!caseProgressTitle || !progress) return;

  const state = progress.ticket_state || "ACTIVE";
  const progressAlertType = progress.ticket_alert_type || progress.alert_type || progress.emergency_type;
  if (progressAlertType) setCurrentAlertType(progressAlertType);
  caseProgressIcon.textContent = stateToProgressIcon(state);
  caseProgressTitle.textContent = progress.headline || "Central informada";
  caseProgressDetail.textContent = progress.detail || "La central ya recibió tu emergencia.";

  if (progress.resolver) {
    const resolverName = progress.resolver.name || "Resolutor municipal";
    currentResolverName = resolverName;
    resolverContactName.textContent = resolverName;

    // v26.3: no mostramos el teléfono celular como canal principal.
    // La comunicación futura será in-app vía WA-CENTER/Asterisk WebRTC, asociada al ticket.
    resolverContactText.textContent =
      `${resolverName} está coordinando tu atención. Puedes pedir una llamada segura directamente con el resolutor.`;

    if (resolverSecureCallButton) {
      resolverSecureCallButton.hidden = true;
    }

    if (voiceButton) {
      voiceButton.hidden = false;
      const span = voiceButton.querySelector("span");
      if (span) span.textContent = "Llamar";
    }
    resolverContactCard.hidden = false;
  } else {
    currentResolverName = null;
    resolverContactCard.hidden = true;
    if (resolverSecureCallButton) resolverSecureCallButton.hidden = true;
    if (voiceButton) {
      voiceButton.hidden = false;
      const span = voiceButton.querySelector("span");
      if (span) span.textContent = "Llamar";
    }
  }

  const steps = Array.isArray(progress.steps) ? progress.steps : [];
  caseProgressSteps.innerHTML = steps.map((step) => {
    const classes = ["case-step"];
    if (step.done) classes.push("done");
    if (step.active) classes.push("active");

    const dot = step.done ? "✓" : step.active ? "!" : "…";

    return `
      <div class="${classes.join(" ")}">
        <div class="case-step-dot">${dot}</div>
        <div>
          <strong>${step.label || "Estado"}</strong>
          <p>${step.detail || ""}</p>
        </div>
      </div>
    `;
  }).join("");
}


function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function activityIcon(kind) {
  switch (kind) {
    case "text": return "💬";
    case "audio": return "🎙️";
    case "video": return "📹";
    case "voice_call": return "☎️";
    case "video_call": return "🎥";
    case "call_response": return "📞";
    default: return "✅";
  }
}

function formatActivityTime(value) {
  if (!value) return "ahora";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "ahora";
  return date.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function captureInlineMediaPlayback(container) {
  const state = new Map();
  container?.querySelectorAll?.("[data-inline-media]").forEach((media) => {
    const key = media.dataset.inlineMedia || media.currentSrc || media.src;
    if (!key) return;
    state.set(key, {
      currentTime: Number.isFinite(media.currentTime) ? media.currentTime : 0,
      wasPlaying: !media.paused && !media.ended,
      volume: media.volume,
      muted: media.muted,
      playbackRate: media.playbackRate
    });
  });
  return state;
}

function restoreInlineMediaPlayback(container, state) {
  if (!container || !state?.size) return;
  container.querySelectorAll("[data-inline-media]").forEach((media) => {
    const saved = state.get(media.dataset.inlineMedia || media.currentSrc || media.src);
    if (!saved) return;
    const restore = () => {
      try {
        if (saved.currentTime > 0 && Number.isFinite(media.duration)) {
          media.currentTime = Math.min(saved.currentTime, Math.max(0, media.duration - 0.05));
        }
        media.volume = saved.volume;
        media.muted = saved.muted;
        media.playbackRate = saved.playbackRate;
        if (saved.wasPlaying) media.play().catch(() => null);
      } catch (error) {
        console.warn("No se pudo restaurar la evidencia multimedia", error);
      }
    };
    if (media.readyState >= 1) restore();
    else media.addEventListener("loadedmetadata", restore, { once: true });
  });
}

function activityMediaHtml(kind, mediaUrl) {
  if (!mediaUrl) return "";
  const safeUrl = escapeHtml(mediaUrl);
  if (kind === "audio") {
    return `<audio class="case-activity-media" controls playsinline preload="metadata" data-inline-media="${safeUrl}" src="${safeUrl}"></audio>`;
  }
  if (kind === "video") {
    return `<video class="case-activity-media case-activity-video" controls playsinline preload="metadata" data-inline-media="${safeUrl}" src="${safeUrl}"></video>`;
  }
  return `<a class="case-activity-link" href="${safeUrl}" target="_blank" rel="noopener">Ver evidencia</a>`;
}

function renderCaseActivity(items = []) {
  if (!caseActivityList || !caseActivityEmpty) return;

  const list = (Array.isArray(items) ? items : [])
    .map((item, index) => ({ item, index }))
    .sort((left, right) => {
      const leftTime = new Date(left.item?.created_at || 0).getTime();
      const rightTime = new Date(right.item?.created_at || 0).getTime();
      const safeLeftTime = Number.isNaN(leftTime) ? 0 : leftTime;
      const safeRightTime = Number.isNaN(rightTime) ? 0 : rightTime;
      return safeLeftTime - safeRightTime || left.index - right.index;
    })
    .map(({ item }) => item);
  caseActivityEmpty.hidden = list.length > 0;

  const signature = JSON.stringify(list.map((item) => [
    item.id,
    item.kind,
    item.title,
    item.body,
    item.media_url,
    item.created_at
  ]));
  if (caseActivityList.dataset.renderSignature === signature) return;
  const playbackState = captureInlineMediaPlayback(caseActivityList);

  caseActivityList.innerHTML = list.map((item) => {
    const kind = item.kind || "event";
    const title = item.title || "Actualización enviada";
    const body = item.body || "";
    const mediaUrl = item.media_url || "";
    const mediaLink = activityMediaHtml(kind, mediaUrl);

    return `
      <div class="case-activity-item ${escapeHtml(kind)}">
        <div class="case-activity-icon">${activityIcon(kind)}</div>
        <div class="case-activity-body">
          <div class="case-activity-title-row">
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(formatActivityTime(item.created_at))}</span>
          </div>
          ${body ? `<p>${escapeHtml(body)}</p>` : ""}
          ${mediaLink}
        </div>
      </div>
    `;
  }).join("");
  caseActivityList.dataset.renderSignature = signature;
  restoreInlineMediaPlayback(caseActivityList, playbackState);
}

function prependCaseActivity(item) {
  if (!caseActivityList || !caseActivityEmpty) return;

  const current = caseActivityList.innerHTML;
  renderCaseActivity([{
    id: `local-${Date.now()}`,
    created_at: new Date().toISOString(),
    ...item
  }]);

  if (current) {
    caseActivityList.insertAdjacentHTML("afterbegin", current);
    delete caseActivityList.dataset.renderSignature;
  }
}

function resetCaseProgress() {
  renderCaseActivity([]);
  renderCaseProgress({
    ticket_state: "ACTIVE",
    headline: "Central informada",
    detail: "La central ya recibió tu emergencia.",
    resolver: null,
    steps: [
      {
        label: "Central informada",
        detail: "La central recibió tu emergencia.",
        done: true,
        active: true
      },
      {
        label: "Asignación de resolutor",
        detail: "La central buscará un resolutor disponible.",
        done: false,
        active: false
      }
    ]
  });
}


function saveHandledCallActionIds() {
  localStorage.setItem("handled_call_action_ids", JSON.stringify(handledCallActionIds.slice(-40)));
}

function formatRecordingTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateRecordingTimer() {
  const value = formatRecordingTime(Date.now() - recordingStartedAt);
  recordingTimer.textContent = value;
  audioInlineTimer.textContent = value;
}

function startRecordingUI() {
  recordingStartedAt = Date.now();
  updateRecordingTimer();
  recordingBanner.hidden = false;
  audioPanel.hidden = false;
  audioButton.classList.add("recording-active");
  navigator.vibrate?.(80);

  clearInterval(recordingTimerInterval);
  recordingTimerInterval = setInterval(updateRecordingTimer, 500);
}

function stopRecordingUI() {
  clearInterval(recordingTimerInterval);
  recordingTimerInterval = null;
  recordingBanner.hidden = true;
  audioPanel.hidden = true;
  audioButton.classList.remove("recording-active");
  audioButton.innerHTML = "🎙️<span>Audio</span>";
  navigator.vibrate?.([60, 80, 60]);
}

function showIncomingCall(request) {
  // v26.3: llamadas internas futuras vía WA-CENTER/Asterisk WebRTC, no por teléfono celular del resolutor.
  return;
}

async function respondIncomingCall(response) {
  if (!activeIncomingCall || !currentTicketId) {
    incomingCallPanel.hidden = true;
    return;
  }

  const request = activeIncomingCall;
  incomingCallPanel.hidden = true;
  activeIncomingCall = null;

  try {
    const res = await fetch(`${API}/tickets/${currentTicketId}/call-response`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_action_id: request.id,
        response,
        mode: request.mode,
        sender_role: "NEIGHBOR",
        sender_name: getNeighborName()
      })
    });

    if (!res.ok) throw new Error("Error HTTP " + res.status);

    handledCallActionIds.push(request.id);
    saveHandledCallActionIds();

    statusLabel.textContent = response === "ACCEPTED"
      ? "Solicitud aceptada. La central fue notificada."
      : "Solicitud rechazada. La central fue notificada.";
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo responder a la central";
  }
}

async function recoverActiveCase() {
  if (!isNeighborRegistered() || currentEventId) return false;

  try {
    const res = await fetch(`${API}/public/mobile/active?user_id=${encodeURIComponent(userId)}`);

    if (!res.ok) return false;

    const data = await res.json();

    if (data.status !== "ok" || !data.event?.id) {
      return false;
    }

    resetSecureVoiceState();
    currentEventId = data.event.id;
    currentTicketId = data.event.ticket_id || data.ticket_id || null;
    setFollowupMinimized(true);

    localStorage.setItem("event_id", currentEventId);
    if (currentTicketId) {
      localStorage.setItem("ticket_id", currentTicketId);
    }

    eventIdLabel.textContent = currentEventId;
    const recoveredAlertType =
      data.event.ticket_alert_type || data.event.alert_type || data.event.emergency_type;
    if (recoveredAlertType) setCurrentAlertType(recoveredAlertType);
    eventStatus.textContent = data.effective_state || data.event.effective_state || data.event.state || "ACTIVO";
    updateTicketLabels();

    if (data.neighbor_progress) {
      renderCaseProgress(data.neighbor_progress);
    }
    renderCaseActivity(data.neighbor_activity || []);

    updateResumeFollowupCard(`Caso activo · ${eventStatus.textContent}`);
    return true;
  } catch (error) {
    console.warn("No se pudo recuperar caso activo", error);
    return false;
  }
}


function setNeighborScreenState(screen) {
  const allowed = ["home", "categories", "active", "auth", "other"];
  const value = allowed.includes(screen) ? screen : "other";

  document.body.classList.remove(
    "neighbor-screen-home",
    "neighbor-screen-categories",
    "neighbor-screen-active",
    "neighbor-screen-auth",
    "neighbor-screen-other"
  );

  document.body.classList.add(`neighbor-screen-${value}`);
}

function showHome(options = {
}) {
  if (currentEventId && !followupMinimized && !options.force) return;

  if (!isNeighborRegistered()) {
    showAuth();
    return;
  }

  updateProfileCard();
  authPanel.hidden = true;
  profilePanel.hidden = true;
  homePanel.hidden = false;
  categoryPanel.hidden = true;
  activePanel.hidden = true;
  closeTextMessageModal();
  audioPanel.hidden = true;
  cancelButton.hidden = true;
  sosButton.disabled = !isNeighborAccountAllowed();
  confirmButton.disabled = !isNeighborAccountAllowed();
  backButton.disabled = false;
  updateResumeFollowupCard();
  if (!isNeighborAccountAllowed()) {
    statusLabel.textContent = "Cuenta no habilitada";
  } else {
    statusLabel.textContent = currentEventId && followupMinimized
      ? "Tienes un caso activo en seguimiento"
      : "Lista para usar";
  }
}

async function showCategories() {
  if (!(await ensureNeighborCanUseSOS())) return;

  if (currentEventId) {
    statusLabel.textContent = "Ya existe una alerta activa";
    showActiveAlert();
    return;
  }

  await refreshNeighborPlatformSettings();

  homePanel.hidden = true;
  categoryPanel.hidden = false;
  activePanel.hidden = true;
  document
    .querySelectorAll(".emergency-option")
    .forEach(option => option.classList.remove("active"));
  if (categoryFeedback) {
    categoryFeedback.hidden = true;
    categoryFeedback.textContent = "";
    categoryFeedback.removeAttribute("data-tone");
  }
  statusLabel.textContent = "Toca una categoría para enviar la alerta";
}

function showActiveAlert() {
  updateCaseTypeCard(selectedAlertType);
  setFollowupMinimized(false);
  authPanel.hidden = true;
  profilePanel.hidden = true;
  homePanel.hidden = true;
  categoryPanel.hidden = true;
  activePanel.hidden = false;
  cancelButton.hidden = false;
  sosButton.disabled = true;
  confirmButton.disabled = false;
  backButton.disabled = false;
  updateTicketLabels();

  // Guardia de navegación: si el modal de texto no está abierto,
  // el seguimiento jamás debe quedar con body.modal-open porque bloquea scroll.
  if (!textPanel || textPanel.hidden) {
    document.body.classList.remove("modal-open");
  }
}

function setSendingState(isSending) {
  confirmButton.disabled = isSending;
  backButton.disabled = isSending;
  cancelButton.disabled = isSending;
  document
    .querySelectorAll(".emergency-option")
    .forEach(option => { option.disabled = isSending; });
}

function getCurrentPositionOnce(options) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("GPS no disponible en este dispositivo"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function getCurrentPosition() {
  try {
    return await getCurrentPositionOnce({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } catch (firstError) {
    console.warn("GPS alta precisión falló, probando modo normal", firstError);
    gpsStatus.textContent = "Reintentando...";
    statusLabel.textContent = "Reintentando ubicación...";
    return await getCurrentPositionOnce({
      enableHighAccuracy: false,
      timeout: 8000,
      maximumAge: 30000
    });
  }
}

function requireTicket() {
  if (!currentTicketId) {
    statusLabel.textContent = "Esperando folio del ticket...";
    alert("La alerta fue enviada, pero aún no tengo el folio del ticket. Espera unos segundos y vuelve a intentar.");
    return false;
  }

  return true;
}

async function sendSOS() {
  if (!(await ensureNeighborCanUseSOS())) return;

  if (currentEventId) {
    statusLabel.textContent = "Ya existe una alerta activa";
    showActiveAlert();
    return;
  }

  setSendingState(true);
  statusLabel.textContent = "Obteniendo ubicación...";
  gpsStatus.textContent = "Buscando...";
  if (categoryFeedback) {
    categoryFeedback.hidden = false;
    categoryFeedback.dataset.tone = "progress";
    categoryFeedback.textContent = "Obteniendo tu ubicación para enviar la alerta…";
  }

  try {
    const position = await getCurrentPosition();

    gpsStatus.textContent = "OK";
    statusLabel.textContent = "Enviando alerta...";
    if (categoryFeedback) {
      categoryFeedback.textContent = "Enviando alerta a la central…";
    }

    const payload = {
      user_id: userId,
      name: getNeighborName(),
      phone: getNeighborPhone(),
      source: "mobile_pwa",
      control_center_code: getNeighborControlCenterCode(),
      alert_type: selectedAlertType,
      title: alertDefinitions[selectedAlertType].title,
      description: "Alerta enviada desde PWA SOS Municipal",
      priority: alertDefinitions[selectedAlertType].priority,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: Math.round(position.coords.accuracy),
      battery: null
    };

    accuracyLabel.textContent = payload.accuracy + " m";

    const res = await fetch(`${API}/public/mobile/sos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || data.status === "error") {
      throw new Error(data.message || ("Error HTTP " + res.status));
    }

    resetSecureVoiceState();
    currentEventId = data.event_id;
    currentTicketId = data.ticket_id || null;

    localStorage.setItem("event_id", currentEventId);
    setCurrentAlertType(selectedAlertType);
    setFollowupMinimized(false);
    if (currentTicketId) {
      localStorage.setItem("ticket_id", currentTicketId);
    }

    eventIdLabel.textContent = currentEventId;
    eventStatus.textContent = "ACTIVO";
    const linkedText = linkedIncidentStatusText(data);
    statusLabel.textContent = linkedText || (currentTicketId
      ? `Alerta enviada · ${shortTicketId(currentTicketId)}`
      : "Alerta enviada");

    showActiveAlert();
    resetCaseProgress();
    renderLinkedIncidentProgress(data);
  } catch (error) {
    console.error(error);
    gpsStatus.textContent = "ERROR";
    statusLabel.textContent = "No se pudo enviar la alerta";
    if (categoryFeedback) {
      categoryFeedback.hidden = false;
      categoryFeedback.dataset.tone = "error";
      categoryFeedback.textContent =
        "No pudimos enviar la alerta. Activa la ubicación, revisa tu conexión y toca nuevamente la categoría para reintentar.";
    }
    alert("No pudimos enviar la alerta. Activa la ubicación, revisa tu conexión y vuelve a intentarlo.");
  } finally {
    setSendingState(false);
  }
}


async function sendMobileSOSPayload({ alert_type, title, priority = 1, description, source = "mobile_pwa", sensor_event_type = null, silent = false, confidence = null }) {
  if (!(await ensureNeighborCanUseSOS())) return false;

  if (currentEventId) {
    statusLabel.textContent = silent ? "Solicitud recibida" : "Ya existe una alerta activa";
    if (!silent) showActiveAlert();
    return false;
  }

  statusLabel.textContent = silent ? "Actualizando ubicación..." : "Obteniendo ubicación...";
  gpsStatus.textContent = "Buscando...";

  try {
    const position = await getCurrentPosition();
    gpsStatus.textContent = "OK";
    accuracyLabel.textContent = Math.round(position.coords.accuracy) + " m";

    const payload = {
      user_id: userId,
      name: getNeighborName(),
      phone: getNeighborPhone(),
      source,
      control_center_code: getNeighborControlCenterCode(),
      alert_type,
      title,
      description,
      priority,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: Math.round(position.coords.accuracy),
      battery: null,
      sensor_event_type,
      confidence,
      silent
    };

    const res = await fetch(`${API}/public/mobile/sos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || data.status === "error") {
      throw new Error(data.message || ("Error HTTP " + res.status));
    }

    resetSecureVoiceState();
    currentEventId = data.event_id;
    currentTicketId = data.ticket_id || null;
    localStorage.setItem("event_id", currentEventId);
    if (currentTicketId) localStorage.setItem("ticket_id", currentTicketId);

    eventIdLabel.textContent = currentEventId;
    eventStatus.textContent = "ACTIVO";
    updateTicketLabels();
    resetCaseProgress();
    renderLinkedIncidentProgress(data);

    if (silent) {
      setFollowupMinimized(true);
      statusLabel.textContent = "Solicitud recibida";
      updateResumeFollowupCard("Caso activo · solicitud recibida");
      showHome({ force: true });
    } else {
      setFollowupMinimized(false);
      const linkedText = linkedIncidentStatusText(data);
      statusLabel.textContent = linkedText || (currentTicketId
        ? `Alerta enviada · ${shortTicketId(currentTicketId)}`
        : "Alerta enviada");
      showActiveAlert();
    }

    return true;
  } catch (error) {
    console.error(error);
    gpsStatus.textContent = "ERROR";
    statusLabel.textContent = "No se pudo enviar la alerta";
    return false;
  }
}

async function sendSilentVifFromShake() {
  setSensorStatus("Alerta silenciosa enviada por agitación. Mantén la calma.", "danger");
  return sendMobileSOSPayload({
    alert_type: "VIF_SILENT_SHAKE",
    title: "Alerta silenciosa VIF",
    description: "Alerta silenciosa generada por triple agitación del teléfono. No llamar automáticamente; evaluar contacto discreto.",
    priority: 1,
    source: "mobile_sensor_shake",
    sensor_event_type: "TRIPLE_SHAKE",
    silent: true,
    confidence: "HIGH"
  });
}

async function sendFallDetectedSOS() {
  hideFallConfirmation();
  setSensorStatus("Enviando alerta por posible caída...", "warning");
  return sendMobileSOSPayload({
    alert_type: "FALL_DETECTED",
    title: "Posible caída / emergencia médica",
    description: "Evento generado por detección de caída o impacto fuerte del teléfono, sin cancelación del usuario.",
    priority: 1,
    source: "mobile_sensor_fall",
    sensor_event_type: "FALL_IMPACT_NO_RESPONSE",
    silent: false,
    confidence: "MEDIUM"
  });
}

let sensorsEnabled = false;
let sensorUsingNativeMotion = false;
let shakeTimestamps = [];
let lastShakeAt = 0;
let lastVifTriggerAt = 0;
let sensorTestModeUntil = 0;
let sensorAutoStartWanted = localStorage.getItem("sos_sensors_wanted") === "true";
let fallCandidateAt = 0;
let fallConfirmTimer = null;
let fallConfirmInterval = null;
let fallSecondsLeft = 25;

const SENSOR_CFG = {
  shakeThreshold: 23,
  shakeWindowMs: 5000,
  shakeMinGapMs: 450,
  shakeCount: 3,
  vifCooldownMs: 120000,
  freefallThreshold: 3.2,
  impactThreshold: 30,
  fallImpactWindowMs: 1600,
  fallCooldownMs: 90000,
  fallConfirmSeconds: 25
};

function setSensorStatus(text, mode = "") {
  if (sensorStatus) {
    sensorStatus.textContent = text;
    sensorStatus.classList.remove("active", "warning", "danger");
    if (mode) sensorStatus.classList.add(mode);
  }

  if (sensorSettingsButton) {
    sensorSettingsButton.classList.remove("active", "warning", "danger");
    if (mode) sensorSettingsButton.classList.add(mode);
  }

  if (sensorIndicatorText) {
    if (sensorsEnabled) {
      sensorIndicatorText.textContent = mode === "warning" ? "Seguridad: detectando" : "Seguridad automática activa";
    } else if (sensorAutoStartWanted) {
      sensorIndicatorText.textContent = "Seguridad automática";
    } else {
      sensorIndicatorText.textContent = "Seguridad automática";
    }
  }
}

function motionMagnitude(eventOrData) {
  const src = eventOrData?.accelerationIncludingGravity || eventOrData?.acceleration || eventOrData || {};
  const x = Number(src.x || 0);
  const y = Number(src.y || 0);
  const z = Number(src.z || 0);
  return Math.sqrt(x * x + y * y + z * z);
}

function openSensorSettings() {
  if (sensorSettingsPanel) sensorSettingsPanel.hidden = false;
}

function closeSensorSettings() {
  if (sensorSettingsPanel) sensorSettingsPanel.hidden = true;
}

function startSensorTestMode() {
  if (!sensorsEnabled) {
    setSensorStatus("Primero activa seguridad automática. Luego podrás probar 3 agitaciones cortas.", "warning");
    openSensorSettings();
    return;
  }
  sensorTestModeUntil = Date.now() + 15000;
  shakeTimestamps = [];
  setSensorStatus("Modo prueba: agita 3 veces cortas en 15 segundos. No se enviará SOS real.", "warning");
}

function handleMotionSample(eventOrData) {
  if (!sensorsEnabled || currentEventId) return;

  const now = Date.now();
  const magnitude = motionMagnitude(eventOrData);

  // 1) Triple agitación: VIF silenciosa
  if (magnitude >= SENSOR_CFG.shakeThreshold && (now - lastShakeAt) > SENSOR_CFG.shakeMinGapMs) {
    lastShakeAt = now;
    shakeTimestamps.push(now);
    shakeTimestamps = shakeTimestamps.filter(ts => now - ts <= SENSOR_CFG.shakeWindowMs);
    setSensorStatus(`Movimiento fuerte detectado (${shakeTimestamps.length}/3)`, "warning");

    if (shakeTimestamps.length >= SENSOR_CFG.shakeCount) {
      if (sensorTestModeUntil && now <= sensorTestModeUntil) {
        shakeTimestamps = [];
        sensorTestModeUntil = 0;
        navigator.vibrate?.([80, 80, 80]);
        setSensorStatus("Prueba exitosa: gesto VIF detectado. No se envió alerta real.", "active");
        return;
      }

      if ((now - lastVifTriggerAt) > SENSOR_CFG.vifCooldownMs) {
        lastVifTriggerAt = now;
        shakeTimestamps = [];
        blurEditableControls();
        navigator.vibrate?.([80, 80, 80]);
        sendSilentVifFromShake();
        return;
      }
    }
  }

  // 2) Posible caída: baja aceleración + impacto fuerte posterior + no respuesta
  if (magnitude <= SENSOR_CFG.freefallThreshold) {
    fallCandidateAt = now;
  }

  if (fallCandidateAt && (now - fallCandidateAt) <= SENSOR_CFG.fallImpactWindowMs && magnitude >= SENSOR_CFG.impactThreshold) {
    if (!fallConfirmTimer) {
      navigator.vibrate?.([180, 120, 180]);
      showFallConfirmation();
    }
    fallCandidateAt = 0;
  }
}

async function requestMotionPermissionIfNeeded() {
  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
    const result = await DeviceMotionEvent.requestPermission();
    if (result !== "granted") throw new Error("Permiso de movimiento no concedido");
  }
}

async function startSensors() {
  if (sensorsEnabled) return;
  if (!(await ensureNeighborCanUseSOS())) return;

  try {
    enterSensorGestureMode();
    await requestMotionPermissionIfNeeded();

    const NativeMotion = window.Capacitor?.Plugins?.Motion;
    if (NativeMotion?.addListener) {
      await NativeMotion.addListener("accel", handleMotionSample);
      sensorUsingNativeMotion = true;
    } else {
      window.addEventListener("devicemotion", handleMotionSample, { passive: true });
      sensorUsingNativeMotion = false;
    }

    sensorsEnabled = true;
    sensorAutoStartWanted = true;
    localStorage.setItem("sos_sensors_wanted", "true");
    if (sensorToggleButton) sensorToggleButton.textContent = "Desactivar seguridad automática";
    setSensorStatus("Activo · 3 agitaciones = VIF silenciosa · caída fuerte = confirmación", "active");
  } catch (error) {
    console.error(error);
    setSensorStatus("No se pudo activar seguridad automática: " + error.message, "danger");
  }
}

async function stopSensors() {
  sensorsEnabled = false;
  sensorAutoStartWanted = false;
  localStorage.setItem("sos_sensors_wanted", "false");
  window.removeEventListener("devicemotion", handleMotionSample);

  try {
    const NativeMotion = window.Capacitor?.Plugins?.Motion;
    if (sensorUsingNativeMotion && NativeMotion?.removeAllListeners) {
      await NativeMotion.removeAllListeners();
    }
  } catch (error) {
    console.warn("No se pudieron limpiar listeners nativos", error);
  }

  sensorUsingNativeMotion = false;
  shakeTimestamps = [];
  lastShakeAt = 0;
  fallCandidateAt = 0;
  hideFallConfirmation();
  if (sensorToggleButton) sensorToggleButton.textContent = "Activar seguridad automática";
  exitSensorGestureMode();
  setSensorStatus("Seguridad automática desactivada. Puedes reactivarla desde configuración.");
}

function toggleSensors() {
  if (sensorsEnabled) {
    stopSensors();
  } else {
    startSensors();
  }
}

async function tryAutoStartSensors() {
  if (!sensorAutoStartWanted || sensorsEnabled || !isNeighborRegistered()) {
    setSensorStatus(sensorAutoStartWanted ? "Toca para activar seguridad automática." : "Pendiente de activar. Funciona mientras la app está abierta o activa.");
    return;
  }

  try {
    await startSensors();
  } catch (error) {
    console.warn("Autoactivación de sensores no disponible", error);
    setSensorStatus("Toca configuración para activar seguridad automática.", "warning");
  }
}

function showFallConfirmation() {
  if (!fallConfirmPanel) return;
  fallSecondsLeft = SENSOR_CFG.fallConfirmSeconds;
  fallConfirmPanel.hidden = false;
  updateFallCountdown();

  fallConfirmInterval = setInterval(() => {
    fallSecondsLeft -= 1;
    updateFallCountdown();
    if (fallSecondsLeft <= 0) {
      sendFallDetectedSOS();
    }
  }, 1000);

  fallConfirmTimer = setTimeout(() => {
    sendFallDetectedSOS();
  }, SENSOR_CFG.fallConfirmSeconds * 1000);
}

function updateFallCountdown() {
  if (fallCountdown) fallCountdown.textContent = `Enviando en ${fallSecondsLeft} s`;
}

function hideFallConfirmation() {
  if (fallConfirmTimer) clearTimeout(fallConfirmTimer);
  if (fallConfirmInterval) clearInterval(fallConfirmInterval);
  fallConfirmTimer = null;
  fallConfirmInterval = null;
  if (fallConfirmPanel) fallConfirmPanel.hidden = true;
}

function cancelFallDetection() {
  hideFallConfirmation();
  fallCandidateAt = 0;
  setSensorStatus("Caída descartada por usuario. Sensores siguen activos.", "active");
}

async function leaveFollowup() {
  if (!currentEventId && !currentTicketId) {
    showHome();
    return;
  }

  const ticketForNotice = currentTicketId;

  if (ticketForNotice) {
    try {
      await fetch(`${API}/tickets/${ticketForNotice}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender_role: "NEIGHBOR",
          sender_name: getNeighborName(),
          message: "El vecino volvió al inicio de la aplicación sin cancelar la emergencia. El caso debe seguir siendo gestionado por la central."
        })
      });
    } catch (error) {
      console.warn("No se pudo registrar salida de seguimiento", error);
    }
  }

  setFollowupMinimized(true);
  updateResumeFollowupCard("La central mantiene el caso activo");
  statusLabel.textContent = "Volviste al inicio. La central mantiene el caso.";

  showHome({ force: true });
}

async function cancelSOS() {
  if (!currentEventId) {
    statusLabel.textContent = "No encontramos la alerta activa para cancelarla";
    console.error("[CANCEL SOS] Falta currentEventId", {
      currentTicketId,
      userId
    });
    return;
  }

  cancelButton.disabled = true;
  statusLabel.textContent = "Cancelando alerta...";

  try {
    const neighborToken = localStorage.getItem(NEIGHBOR_TOKEN_KEY) || "";
    if (!neighborToken) {
      throw new Error("Tu sesión venció. Vuelve a ingresar para cancelar la alerta.");
    }

    const res = await fetch(`${API}/public/mobile/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${neighborToken}`
      },
      body: JSON.stringify({
        event_id: currentEventId,
        user_id: userId
      })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.status === "error") {
      throw new Error(data.message || `No fue posible cancelar la alerta (HTTP ${res.status})`);
    }

    clearCurrentCaseLocal();

    eventStatus.textContent = "CANCELADO";
    statusLabel.textContent = "Alerta cancelada";
    showHome({ force: true });
  } catch (error) {
    const message = error?.message || "No se pudo cancelar la alerta";
    console.error("[CANCEL SOS]", {
      message,
      eventId: currentEventId,
      ticketId: currentTicketId,
      userId
    });
    statusLabel.textContent = message;
    showActiveAlert();
  } finally {
    cancelButton.disabled = false;
  }
}

async function refreshStatus() {
  if (!currentEventId) return;

  try {
    const res = await fetch(`${API}/public/mobile/status/${currentEventId}`);

    const data = await res.json();

    if (!res.ok || data.status === "error") {
      throw new Error(data.message || ("Error HTTP " + res.status));
    }
    const event = data?.event || {};
    const terminalStates = ["CANCELLED", "CLOSED", "RESOLVED"];

    const ticketState = event.ticket_state || data?.ticket_state || null;
    const state = terminalStates.includes(ticketState)
      ? ticketState
      : (event.effective_state || data?.effective_state || event.state || "DESCONOCIDO");

    const refreshedAlertType =
      event.ticket_alert_type || event.alert_type || event.emergency_type;
    if (refreshedAlertType) setCurrentAlertType(refreshedAlertType);

    if (event.ticket_id && !currentTicketId) {
      currentTicketId = event.ticket_id;
      localStorage.setItem("ticket_id", currentTicketId);
      updateTicketLabels();
    }

    if (data?.neighbor_progress) {
      renderCaseProgress(data.neighbor_progress);
    }
    renderCaseActivity(data?.neighbor_activity || []);

    if (data?.pending_call_request && !terminalStates.includes(state)) {
      showIncomingCall(data.pending_call_request);
    }

    const incomingVoiceSession = neighborIncomingVoiceSession(data?.voice_sessions || []);
    if (incomingVoiceSession && !terminalStates.includes(state)) {
      prepareIncomingSecureVoiceSession(incomingVoiceSession);
    }

    eventStatus.textContent = state;
    statusLabel.textContent = currentTicketId
      ? `Estado: ${state} · ${shortTicketId(currentTicketId)}`
      : "Estado: " + state;
    updateResumeFollowupCard(`Estado: ${state}`);

    if (terminalStates.includes(state)) {
      const finishedTicket = currentTicketId;

      clearCurrentCaseLocal();

      statusLabel.textContent =
        state === "RESOLVED"
          ? `Caso resuelto · ${shortTicketId(finishedTicket)}`
          : state === "CLOSED"
            ? `Caso cerrado · ${shortTicketId(finishedTicket)}`
            : "Alerta cancelada";

      setTimeout(() => showHome({ force: true }), 1800);
      return;
    }
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "Sin conexión con plataforma";
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


function openTextMessageModal() {
  if (!requireTicket()) return;
  if (!textPanel) return;

  textPanel.hidden = false;
  textPanel.classList.add("is-open");
  textPanel.removeAttribute("aria-hidden");
  textPanel.style.removeProperty("display");
  document.body.classList.add("modal-open");

  setTimeout(() => textMessage?.focus(), 80);
}

function closeTextMessageModal() {
  if (!textPanel) {
    document.body.classList.remove("modal-open");
    return;
  }

  textPanel.hidden = true;
  textPanel.classList.remove("is-open");
  textPanel.setAttribute("aria-hidden", "true");
  textPanel.style.removeProperty("display");
  document.body.classList.remove("modal-open");
}


async function sendTextMessage() {
  if (!requireTicket()) return;

  const message = textMessage.value.trim();
  if (!message) {
    alert("Escribe un mensaje antes de enviarlo.");
    return;
  }

  sendTextButton.disabled = true;
  statusLabel.textContent = "Enviando mensaje...";

  try {
    const res = await fetch(`${API}/tickets/${currentTicketId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender_role: "NEIGHBOR",
        sender_name: getNeighborName(),
        message
      })
    });

    if (!res.ok) {
      throw new Error("Error HTTP " + res.status);
    }

    prependCaseActivity({
      kind: "text",
      title: "Mensaje de texto enviado",
      body: message
    });
    textMessage.value = "";
    closeTextMessageModal();
    statusLabel.textContent = "Mensaje enviado a la central";
    refreshStatus();
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo enviar el mensaje";
  } finally {
    sendTextButton.disabled = false;
  }
}

async function uploadMedia(mediaType, blob, fileName) {
  if (!requireTicket()) return;

  statusLabel.textContent = mediaType === "audio"
    ? "Subiendo audio..."
    : "Subiendo video...";

  const dataUrl = await blobToDataUrl(blob);

  const res = await fetch(`${API}/tickets/${currentTicketId}/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sender_role: "NEIGHBOR",
      sender_name: getNeighborName(),
      media_type: mediaType,
      file_name: fileName,
      data_url: dataUrl
    })
  });

  if (!res.ok) {
    throw new Error("Error HTTP " + res.status);
  }

  const data = await res.json();
  prependCaseActivity({
    kind: mediaType,
    title: mediaType === "audio" ? "Audio enviado" : "Video enviado",
    media_url: data.media_url || null,
    file_name: fileName
  });
  statusLabel.textContent = mediaType === "audio"
    ? "Audio enviado a la central"
    : "Video enviado a la central";
  refreshStatus();
}

function getPreferredAudioOptions() {
  if (!window.MediaRecorder) return {};

  const candidates = [
    "audio/mp4",
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus"
  ];

  for (const mimeType of candidates) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return { mimeType };
    }
  }

  return {};
}

function extensionForMime(mimeType, fallback) {
  const clean = String(mimeType || "").split(";")[0];
  const map = {
    "audio/mp4": "m4a",
    "audio/webm": "webm",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm"
  };

  return map[clean] || fallback;
}

async function toggleAudioRecording() {
  if (!requireTicket()) return;

  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Este navegador no permite grabar audio desde la PWA.");
    return;
  }

  try {
    audioChunks = [];
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const options = getPreferredAudioOptions();
    mediaRecorder = new MediaRecorder(audioStream, options);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      clearTimeout(recordingTimeout);
      audioStream?.getTracks().forEach(track => track.stop());
      stopRecordingUI();

      const mimeType = mediaRecorder.mimeType || audioChunks[0]?.type || "audio/webm";
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const ext = extensionForMime(mimeType, "webm");

      try {
        await uploadMedia("audio", audioBlob, `audio-${Date.now()}.${ext}`);
      } catch (error) {
        console.error(error);
        statusLabel.textContent = "No se pudo enviar el audio";
      }
    };

    mediaRecorder.start();
    audioStatus.textContent = "Mantén el teléfono cerca y describe qué está ocurriendo. Máximo 30 segundos.";
    audioButton.innerHTML = "⏹️<span>Detener audio</span>";
    statusLabel.textContent = "Grabando audio...";
    startRecordingUI();

    recordingTimeout = setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        mediaRecorder.stop();
      }
    }, 30000);
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo acceder al micrófono";
  }
}

async function uploadSelectedVideo() {
  const file = videoInput.files?.[0];
  if (!file) return;

  if (file.size > 25 * 1024 * 1024) {
    alert("El video es muy grande para la demo. Usa un clip más corto.");
    videoInput.value = "";
    return;
  }

  try {
    await uploadMedia("video", file, file.name || `video-${Date.now()}.mp4`);
  } catch (error) {
    console.error(error);
    statusLabel.textContent = "No se pudo enviar el video";
  } finally {
    videoInput.value = "";
  }
}



const VOICE_CALL_STATES = Object.freeze({
  IDLE: "IDLE",
  REQUESTING_CALL: "REQUESTING_CALL",
  RINGING: "RINGING",
  CONNECTED: "CONNECTED",
  ENDING: "ENDING",
  ENDED: "ENDED",
  FAILED: "FAILED",
  NO_ANSWER: "NO_ANSWER",
  REJECTED: "REJECTED"
});
const VOICE_CALL_TERMINAL_STATES = new Set([
  VOICE_CALL_STATES.ENDED,
  VOICE_CALL_STATES.FAILED,
  VOICE_CALL_STATES.NO_ANSWER,
  VOICE_CALL_STATES.REJECTED
]);
const VOICE_CALL_TIMEOUT_MS = 45_000;
const VOICE_STATUS_POLL_MS = 1_500;

function createSecureVoiceState() {
  return {
    session: null,
    ua: null,
    call: null,
    peerConnection: null,
    state: "IDLE",
    direction: null,
    muted: false,
    ringbackContexts: new Set(),
    ringbackInterval: null,
    ringbackAudioActive: false,
    statusPollTimer: null,
    noAnswerTimer: null,
    durationTimer: null,
    connectedAt: null,
    connectedReported: false,
    cleanupPromise: null,
    backendFinalized: false,
    requestController: null
  };
}

function voiceSessionKey(session) {
  return session?.id || session?.wa_center_session_id || null;
}

function activeVoiceStatus(status) {
  return !["FAILED", "ENDED", "EXPIRED", "NO_ANSWER", "REJECTED"].includes(
    String(status || "CREATED").toUpperCase()
  );
}

function setVoicePanelVisible(visible) {
  if (voiceSessionPanel) voiceSessionPanel.hidden = !visible;
  document.body.classList.toggle("voice-call-open", Boolean(visible));
}

function setVoiceStatus(message) {
  if (voiceSessionStatus) voiceSessionStatus.textContent = message || "";
}

function setVoiceCallState(state, options = {}) {
  secureVoice.state = state;
  setVoicePanelVisible(state !== VOICE_CALL_STATES.IDLE);
  if (voiceSessionTitle && options.title) voiceSessionTitle.textContent = options.title;
  if (options.message) setVoiceStatus(options.message);

  const connected = state === VOICE_CALL_STATES.CONNECTED;
  const terminal = VOICE_CALL_TERMINAL_STATES.has(state);
  const incomingRinging = secureVoice.direction === "incoming" && state === VOICE_CALL_STATES.RINGING;

  if (voiceConnectButton) {
    voiceConnectButton.hidden = !incomingRinging;
    voiceConnectButton.disabled = !incomingRinging;
    voiceConnectButton.textContent = "Contestar";
  }
  if (voiceMuteButton) {
    voiceMuteButton.hidden = !connected;
    voiceMuteButton.disabled = !connected;
    voiceMuteButton.textContent = secureVoice.muted ? "🎙️ Activar" : "🎙️ Silenciar";
  }
  if (voiceHangupButton) {
    voiceHangupButton.hidden = terminal;
    voiceHangupButton.disabled = state === VOICE_CALL_STATES.ENDING;
    voiceHangupButton.textContent = incomingRinging ? "Rechazar" : "Colgar";
  }
  if (voiceCallTimer) voiceCallTimer.hidden = !connected;
}

function getVoiceWebrtcPayload(voiceSession) {
  if (!voiceSession) return null;
  return voiceSession.webrtc || voiceSession.party_a_webrtc || null;
}

function playRingbackBurst() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const contexts = secureVoice.ringbackContexts;
    const ctx = new AudioContext();
    contexts.add(ctx);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.22, ctx.currentTime + 0.72);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.82);
    gain.connect(ctx.destination);

    [440, 480].forEach((frequency) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.connect(gain);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.85);
    });
    setTimeout(() => {
      contexts.delete(ctx);
      ctx.close().catch(() => null);
    }, 1_100);
  } catch (error) {
    console.warn("No se pudo reproducir el tono de llamada", error);
  }
}

function createCallToneUrl() {
  if (persistentCallToneUrl) return persistentCallToneUrl;
  const sampleRate = 8000;
  const durationSeconds = 3;
  const toneSeconds = 0.9;
  const sampleCount = sampleRate * durationSeconds;
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);
  const writeText = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index));
    }
  };
  writeText(0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, sampleCount * 2, true);

  for (let sample = 0; sample < sampleCount; sample += 1) {
    const time = sample / sampleRate;
    let value = 0;
    if (time < toneSeconds) {
      const fade = Math.min(1, time / 0.03, (toneSeconds - time) / 0.06);
      value = (Math.sin(2 * Math.PI * 440 * time) + Math.sin(2 * Math.PI * 480 * time)) * 0.16 * fade;
    }
    view.setInt16(44 + sample * 2, Math.max(-1, Math.min(1, value)) * 32767, true);
  }

  persistentCallToneUrl = URL.createObjectURL(new Blob([buffer], { type: "audio/wav" }));
  return persistentCallToneUrl;
}

function getPersistentCallToneAudio() {
  if (persistentCallToneAudio) return persistentCallToneAudio;
  persistentCallToneAudio = new Audio(createCallToneUrl());
  persistentCallToneAudio.loop = true;
  persistentCallToneAudio.preload = "auto";
  persistentCallToneAudio.playsInline = true;
  return persistentCallToneAudio;
}

async function unlockPersistentCallTone() {
  if (callToneUnlocked) return;
  const audio = getPersistentCallToneAudio();
  const previousVolume = audio.volume;
  audio.volume = 0;
  try {
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
    callToneUnlocked = true;
    document.removeEventListener("pointerdown", unlockPersistentCallTone);
  } catch (_) {
    // iOS permitirá reintentar en la siguiente interacción del usuario.
  } finally {
    audio.volume = previousVolume || 0.85;
  }
}

document.addEventListener("pointerdown", unlockPersistentCallTone, { passive: true });

function startRingback() {
  if (secureVoice.ringbackAudioActive) return;
  secureVoice.ringbackAudioActive = true;
  const audio = getPersistentCallToneAudio();
  audio.currentTime = 0;
  audio.volume = 0.85;
  audio.play().catch(() => {
    playRingbackBurst();
    secureVoice.ringbackInterval = setInterval(playRingbackBurst, 3_000);
  });
}

function stopRingback() {
  secureVoice.ringbackAudioActive = false;
  clearInterval(secureVoice.ringbackInterval);
  secureVoice.ringbackInterval = null;
  if (persistentCallToneAudio) {
    persistentCallToneAudio.pause();
    persistentCallToneAudio.currentTime = 0;
  }
  secureVoice.ringbackContexts.forEach((context) => {
    try { context.close().catch(() => null); } catch {}
  });
  secureVoice.ringbackContexts.clear();
}

function playNeighborRing() {
  try { navigator.vibrate?.([250, 120, 250]); } catch {}
  playRingbackBurst();
}

function stopRemoteAudio() {
  if (!voiceRemoteAudio) return;
  const stream = voiceRemoteAudio.srcObject;
  try { stream?.getTracks?.().forEach((track) => track.stop()); } catch {}
  try { voiceRemoteAudio.pause(); } catch {}
  voiceRemoteAudio.srcObject = null;
}

function stopLocalMediaTracks() {
  const connection = secureVoice.peerConnection || secureVoice.call?.connection;
  try {
    connection?.getSenders?.().forEach((sender) => sender.track?.stop());
    connection?.getReceivers?.().forEach((receiver) => receiver.track?.stop());
  } catch {}
}

function closePeerConnection() {
  const connection = secureVoice.peerConnection || secureVoice.call?.connection;
  try {
    if (connection && connection.signalingState !== "closed") connection.close();
  } catch {}
  secureVoice.peerConnection = null;
}

function clearVoiceTimers() {
  clearInterval(secureVoice.statusPollTimer);
  clearTimeout(secureVoice.noAnswerTimer);
  clearInterval(secureVoice.durationTimer);
  secureVoice.statusPollTimer = null;
  secureVoice.noAnswerTimer = null;
  secureVoice.durationTimer = null;
}

function updateVoiceCallTimer() {
  if (!voiceCallTimer || !secureVoice.connectedAt) return;
  const elapsed = Math.max(0, Date.now() - secureVoice.connectedAt);
  voiceCallTimer.textContent = formatRecordingTime(elapsed);
}

function startConnectedCallTimer() {
  if (!secureVoice.connectedAt) secureVoice.connectedAt = Date.now();
  clearTimeout(secureVoice.noAnswerTimer);
  secureVoice.noAnswerTimer = null;
  updateVoiceCallTimer();
  clearInterval(secureVoice.durationTimer);
  secureVoice.durationTimer = setInterval(updateVoiceCallTimer, 1_000);
}

function markSecureVoiceConnected() {
  if (secureVoice.state === VOICE_CALL_STATES.CONNECTED) return;
  stopRingback();
  setVoiceCallState(VOICE_CALL_STATES.CONNECTED, {
    title: "Llamada conectada",
    message: "Puedes explicar lo que está ocurriendo."
  });
  startConnectedCallTimer();
}

async function reportNeighborVoiceConnected() {
  const sessionId = voiceSessionKey(secureVoice.session);
  if (!currentEventId || !sessionId || secureVoice.connectedReported) return;
  secureVoice.connectedReported = true;

  try {
    const response = await fetch(
      `${API}/public/mobile/events/${currentEventId}/voice/sessions/${encodeURIComponent(sessionId)}/connected`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
      }
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.status === "error") {
      throw new Error(data.message || "No fue posible confirmar la entrada al canal");
    }
    if (String(data.voice_session?.status || "").toUpperCase() === "CONNECTED") {
      markSecureVoiceConnected();
    }
  } catch (error) {
    secureVoice.connectedReported = false;
    console.warn("No se pudo confirmar la entrada del vecino al canal", error);
  }
}

async function notifyVoiceBackendEnded(reason) {
  const sessionId = voiceSessionKey(secureVoice.session);
  if (!currentEventId || !sessionId || secureVoice.backendFinalized) return;
  secureVoice.backendFinalized = true;

  const response = await fetch(
    `${API}/public/mobile/events/${currentEventId}/voice/sessions/${encodeURIComponent(sessionId)}/end`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, reason })
    }
  );
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status === "error") {
    throw new Error(data.message || "No fue posible cerrar la sesión de llamada");
  }
}

function terminalVoiceCopy(state) {
  if ([VOICE_CALL_STATES.NO_ANSWER, VOICE_CALL_STATES.REJECTED, VOICE_CALL_STATES.FAILED].includes(state)) {
    return {
      title: "No fue posible conectar la llamada.",
      message: "Tu emergencia sigue activa y la central continúa gestionando el caso."
    };
  }
  return {
    title: "Llamada finalizada",
    message: "Tu emergencia sigue activa y puedes continuar enviando antecedentes."
  };
}

async function cleanupSecureVoice(options = {}) {
  if (secureVoice.cleanupPromise) return secureVoice.cleanupPromise;

  const {
    state = VOICE_CALL_STATES.ENDED,
    reason = "HANGUP",
    notifyBackend = true,
    hideOverlay = false
  } = options;

  // Se instala primero un guard para que eventos SIP síncronos no reentren al cleanup.
  secureVoice.cleanupPromise = Promise.resolve();
  const cleanupTask = (async () => {
    setVoiceCallState(VOICE_CALL_STATES.ENDING, {
      title: "Finalizando llamada…",
      message: "Estamos cerrando el canal de audio de forma segura."
    });
    stopRingback();
    clearVoiceTimers();
    try { secureVoice.requestController?.abort?.(); } catch {}
    secureVoice.requestController = null;
    stopRemoteAudio();
    stopLocalMediaTracks();

    try { secureVoice.call?.terminate?.(); } catch {}
    closePeerConnection();
    try { secureVoice.ua?.stop?.(); } catch {}
    secureVoice.call = null;
    secureVoice.ua = null;

    if (notifyBackend) {
      try {
        await notifyVoiceBackendEnded(reason);
      } catch (error) {
        console.warn("La limpieza local terminó, pero el backend no confirmó el cierre", error);
      }
    }

    const copy = terminalVoiceCopy(state);
    setVoiceCallState(state, copy);
    if (hideOverlay) {
      setVoicePanelVisible(false);
    } else {
      setTimeout(() => {
        if (secureVoice.state === state) setVoicePanelVisible(false);
      }, 2_200);
    }
  })();
  secureVoice.cleanupPromise = cleanupTask;

  return cleanupTask;
}

function resetSecureVoiceState() {
  if (!voiceSessionKey(secureVoice.session) && !secureVoice.call && !secureVoice.ua) {
    stopRingback();
    clearVoiceTimers();
    stopRemoteAudio();
    secureVoice = createSecureVoiceState();
    setVoicePanelVisible(false);
    return;
  }
  const shouldNotify = Boolean(voiceSessionKey(secureVoice.session)) &&
    !VOICE_CALL_TERMINAL_STATES.has(secureVoice.state);
  void cleanupSecureVoice({
    state: VOICE_CALL_STATES.ENDED,
    reason: "CASE_RESET",
    notifyBackend: shouldNotify,
    hideOverlay: true
  });
}

function stopSecureVoice() {
  void cleanupSecureVoice({
    state: VOICE_CALL_STATES.ENDED,
    reason: "HANGUP",
    notifyBackend: true
  });
}

function neighborIncomingVoiceSession(sessions = []) {
  return (sessions || []).find((session) => {
    if (!session || !activeVoiceStatus(session.status)) return false;
    const requester = String(session.requested_by || "").toUpperCase();
    if (requester === "NEIGHBOR") return false;
    if (requester === "RESOLVER") return true;
    return requester === "OPERATOR" || requester === "CENTRAL";
  }) || null;
}

function prepareIncomingSecureVoiceSession(session) {
  if (!session) return;
  const nextKey = voiceSessionKey(session);
  if (nextKey && nextKey === voiceSessionKey(secureVoice.session)) return;
  if (secureVoice.session && !VOICE_CALL_TERMINAL_STATES.has(secureVoice.state)) return;

  secureVoice = createSecureVoiceState();
  secureVoice.session = session;
  secureVoice.direction = "incoming";
  startRingback();
  setVoiceCallState(VOICE_CALL_STATES.RINGING, {
    title: "Llamada entrante",
    message: "La municipalidad quiere comunicarse contigo por tu emergencia."
  });
  startVoiceLifecycleTimers();
}

async function ensureNeighborVoiceCredentials() {
  const currentWebrtc = getVoiceWebrtcPayload(secureVoice.session);
  if (currentWebrtc && (currentWebrtc.ha1 || currentWebrtc.password)) return secureVoice.session;
  const sessionId = voiceSessionKey(secureVoice.session);
  if (!currentEventId || !sessionId) return secureVoice.session;

  setVoiceStatus("Preparando el audio seguro…");
  const res = await fetch(`${API}/public/mobile/events/${currentEventId}/voice/sessions/${sessionId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === "error") {
    throw new Error(data.message || "No fue posible entrar a la llamada");
  }
  secureVoice.session = data.voice_session;
  return secureVoice.session;
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = Array.from(document.scripts).find((script) => script.src && script.src.includes(src));
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      if (window.JsSIP) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function ensureJsSIPLoaded() {
  if (window.JsSIP) return;

  const sources = [
    "vendor/jssip.min.js",
    "https://cdn.jsdelivr.net/npm/jssip@3.10.1/dist/jssip.min.js",
    "https://unpkg.com/jssip@3.10.1/dist/jssip.min.js"
  ];

  for (const src of sources) {
    try {
      await loadScriptOnce(src);
      if (window.JsSIP) return;
    } catch (error) {
      console.warn("No se pudo cargar JsSIP desde", src, error);
    }
  }

  throw new Error("No se pudo cargar el cliente WebRTC. Revisa conexión o vendor/jssip.min.js.");
}

async function connectSecureVoice() {
  await ensureNeighborVoiceCredentials();
  const webrtc = getVoiceWebrtcPayload(secureVoice.session);
  if (!webrtc) {
    throw new Error("No fue posible preparar el canal de audio");
  }

  await ensureJsSIPLoaded();
  setVoiceCallState(VOICE_CALL_STATES.RINGING, {
    title: secureVoice.direction === "incoming" ? "Conectando llamada…" : "Conectando llamada…",
    message: "Te estamos conectando para que puedas entregar más detalles de tu emergencia."
  });
  if (secureVoice.direction === "outgoing") startRingback();
  else stopRingback();

  const sipDomain = webrtc.sip_domain || "wa-center.vsti.cl";
  const wssUrl = webrtc.wss_url || "wss://wa-center.vsti.cl/ws";
  const destination = webrtc.destination;

  if (!webrtc.username || !destination) {
    throw new Error("Credenciales WebRTC incompletas");
  }

  const socket = new JsSIP.WebSocketInterface(wssUrl);
  const config = {
    sockets: [socket],
    uri: `sip:${webrtc.username}@${sipDomain}`,
    authorization_user: webrtc.username,
    register: true,
    session_timers: false,
    realm: webrtc.realm || "asterisk"
  };

  if (webrtc.ha1) {
    config.ha1 = webrtc.ha1;
  } else {
    config.password = webrtc.password;
  }

  const ua = new JsSIP.UA(config);
  secureVoice.ua = ua;

  ua.on("connected", () => setVoiceStatus("Preparando canal de audio seguro…"));
  ua.on("disconnected", () => {
    if (!VOICE_CALL_TERMINAL_STATES.has(secureVoice.state)) {
      void cleanupSecureVoice({
        state: VOICE_CALL_STATES.FAILED,
        reason: "WEBRTC_DISCONNECTED",
        notifyBackend: true
      });
    }
  });
  ua.on("registrationFailed", (e) => {
    console.error("WA-Center registration failed", e);
    void cleanupSecureVoice({
      state: VOICE_CALL_STATES.FAILED,
      reason: "REGISTRATION_FAILED",
      notifyBackend: true
    });
  });

  ua.on("registered", () => {
    if (secureVoice.call || VOICE_CALL_TERMINAL_STATES.has(secureVoice.state)) return;
    const target = `sip:${destination}@${sipDomain}`;
    const options = {
      mediaConstraints: { audio: true, video: false },
      pcConfig: { iceServers: secureVoice.session?.ice_servers || [] },
      eventHandlers: {
        progress: () => setVoiceCallState(VOICE_CALL_STATES.RINGING, {
          title: "Conectando llamada…",
          message: "Te estamos conectando para que puedas entregar más detalles de tu emergencia."
        }),
        confirmed: () => {
          // Esta confirmación solo indica que el anexo del vecino entró al bridge.
          // La llamada se considera contestada únicamente cuando backend/WA-Center
          // confirman que ambas partes están conectadas.
          setVoiceCallState(VOICE_CALL_STATES.RINGING, {
            title: "Llamando…",
            message: "Esperando que la municipalidad conteste."
          });
          void reportNeighborVoiceConnected();
        },
        ended: () => {
          void cleanupSecureVoice({
            state: VOICE_CALL_STATES.ENDED,
            reason: "REMOTE_ENDED",
            notifyBackend: true
          });
        },
        failed: (e) => {
          console.error("WA-Center call failed", e);
          const cause = String(e?.cause || "").toUpperCase();
          const state = cause.includes("NO ANSWER")
            ? VOICE_CALL_STATES.NO_ANSWER
            : (cause.includes("REJECT") || cause.includes("DECLINE") || cause.includes("BUSY"))
              ? VOICE_CALL_STATES.REJECTED
              : VOICE_CALL_STATES.FAILED;
          void cleanupSecureVoice({
            state,
            reason: cause || "WEBRTC_FAILED",
            notifyBackend: true
          });
        }
      }
    };

    const call = ua.call(target, options);
    secureVoice.call = call;

    const attachConnection = (connection) => {
      if (!connection) return;
      secureVoice.peerConnection = connection;
      connection.addEventListener("track", (event) => {
        if (voiceRemoteAudio) voiceRemoteAudio.srcObject = event.streams[0];
      });
    };
    attachConnection(call.connection);
    call.on?.("peerconnection", (event) => attachConnection(event?.peerconnection));
  });

  ua.start();
}

function toggleSecureVoiceMute() {
  const connection = secureVoice.peerConnection || secureVoice.call?.connection;
  const audioTracks = (connection?.getSenders?.() || [])
    .map((sender) => sender.track)
    .filter((track) => track?.kind === "audio");
  if (!audioTracks.length) return;

  secureVoice.muted = !secureVoice.muted;
  audioTracks.forEach((track) => { track.enabled = !secureVoice.muted; });
  if (voiceMuteButton) {
    voiceMuteButton.textContent = secureVoice.muted ? "🎙️ Activar" : "🎙️ Silenciar";
  }
}

function prepareSecureVoiceSession(voiceSession) {
  secureVoice.session = voiceSession;
  setVoiceCallState(VOICE_CALL_STATES.RINGING, {
    title: "Conectando llamada…",
    message: "Te estamos conectando para que puedas entregar más detalles de tu emergencia."
  });
}

async function pollSecureVoiceStatus() {
  const sessionId = voiceSessionKey(secureVoice.session);
  if (!currentEventId || !sessionId || VOICE_CALL_TERMINAL_STATES.has(secureVoice.state)) return;

  try {
    const response = await fetch(
      `${API}/public/mobile/events/${currentEventId}/voice/sessions/${encodeURIComponent(sessionId)}/status?user_id=${encodeURIComponent(userId || "")}`
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.status === "error") return;

    const backendStatus = String(data.voice_session?.status || "").toUpperCase();
    if (backendStatus === "CONNECTED" && secureVoice.state !== VOICE_CALL_STATES.CONNECTED) {
      markSecureVoiceConnected();
      return;
    }
    if (["ENDED", "FAILED", "NO_ANSWER", "REJECTED", "EXPIRED"].includes(backendStatus)) {
      const terminalState = backendStatus === "NO_ANSWER" || backendStatus === "EXPIRED"
        ? VOICE_CALL_STATES.NO_ANSWER
        : backendStatus === "REJECTED"
          ? VOICE_CALL_STATES.REJECTED
          : backendStatus === "FAILED"
            ? VOICE_CALL_STATES.FAILED
            : VOICE_CALL_STATES.ENDED;
      await cleanupSecureVoice({
        state: terminalState,
        reason: `REMOTE_${backendStatus}`,
        notifyBackend: false
      });
    }
  } catch (error) {
    console.warn("No fue posible consultar el estado de llamada", error);
  }
}

function startVoiceLifecycleTimers() {
  clearVoiceTimers();
  secureVoice.statusPollTimer = setInterval(pollSecureVoiceStatus, VOICE_STATUS_POLL_MS);
  secureVoice.noAnswerTimer = setTimeout(() => {
    if (![VOICE_CALL_STATES.CONNECTED, ...VOICE_CALL_TERMINAL_STATES].includes(secureVoice.state)) {
      void cleanupSecureVoice({
        state: VOICE_CALL_STATES.NO_ANSWER,
        reason: "NO_ANSWER",
        notifyBackend: true
      });
    }
  }, VOICE_CALL_TIMEOUT_MS);
}

async function requestCall(mode = "voice") {
  if (!currentEventId) {
    statusLabel.textContent = "Primero debes tener un caso activo para solicitar llamada segura.";
    return;
  }

  if (secureVoice.session && !VOICE_CALL_TERMINAL_STATES.has(secureVoice.state)) {
    setVoicePanelVisible(true);
    return;
  }

  secureVoice = createSecureVoiceState();
  secureVoice.direction = "outgoing";
  setVoiceCallState(VOICE_CALL_STATES.REQUESTING_CALL, {
    title: "Conectando llamada…",
    message: "Te estamos conectando para que puedas entregar más detalles de tu emergencia."
  });

  const buttons = [voiceButton, resolverSecureCallButton].filter(Boolean);
  buttons.forEach((button) => { button.disabled = true; });

  try {
    secureVoice.requestController = new AbortController();
    const res = await fetch(`${API}/public/mobile/events/${currentEventId}/voice/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: secureVoice.requestController.signal,
      body: JSON.stringify({
        user_id: userId,
        mode
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.status === "error") {
      throw new Error(data.message || "No se pudo solicitar la llamada segura");
    }

    secureVoice.requestController = null;
    prepareSecureVoiceSession(data.voice_session);
    startRingback();
    startVoiceLifecycleTimers();
    await connectSecureVoice();
    await refreshStatus();
  } catch (error) {
    console.error(error);
    await cleanupSecureVoice({
      state: VOICE_CALL_STATES.FAILED,
      reason: "REQUEST_FAILED",
      notifyBackend: Boolean(voiceSessionKey(secureVoice.session))
    });
  } finally {
    buttons.forEach((button) => { button.disabled = false; });
  }
}


function resumeFollowup() {
  if (!currentEventId && !currentTicketId) {
    statusLabel.textContent = "No tienes casos activos en seguimiento";
    updateResumeFollowupCard();
    return;
  }

  setFollowupMinimized(false);
  showActiveAlert();
  refreshStatus();
}

document.querySelectorAll(".emergency-option").forEach(button => {
  button.addEventListener("click", async () => {
    if (button.disabled || currentEventId) return;

    document
      .querySelectorAll(".emergency-option")
      .forEach(option => option.classList.remove("active"));

    button.classList.add("active");
    selectedAlertType = normalizeAlertType(button.dataset.type);

    statusLabel.textContent =
      "Enviando " + alertDefinitions[selectedAlertType].title + "...";

    await sendSOS();
  });
});

applyNeighborEmergencyCategories();

sosButton.addEventListener("click", showCategories);
confirmButton.addEventListener("click", sendSOS);
backButton.addEventListener("click", showHome);
cancelButton.addEventListener("click", cancelSOS);
leaveFollowupButton.addEventListener("click", leaveFollowup);
resumeFollowupButton?.addEventListener("click", resumeFollowup);
voiceButton?.addEventListener("click", () => requestCall("voice"));
resolverSecureCallButton?.addEventListener("click", () => requestCall("voice"));
voiceConnectButton?.addEventListener("click", async () => {
  try {
    if (secureVoice.direction === "incoming") secureVoice.direction = "answered-incoming";
    await connectSecureVoice();
  } catch (error) {
    console.error(error);
    setVoiceStatus(error.message || "No fue posible conectar la llamada segura");
    if (voiceConnectButton) voiceConnectButton.disabled = false;
    if (voiceHangupButton) voiceHangupButton.disabled = true;
  }
});
voiceMuteButton?.addEventListener("click", toggleSecureVoiceMute);
voiceHangupButton?.addEventListener("click", stopSecureVoice);
videoCallButton?.addEventListener("click", () => requestCall("video"));
textButton.addEventListener("click", openTextMessageModal);
sendTextButton.addEventListener("click", sendTextMessage);

document.getElementById("closeTextPanelButton")?.addEventListener("click", closeTextMessageModal);
document.getElementById("cancelTextPanelButton")?.addEventListener("click", closeTextMessageModal);
textPanel?.addEventListener("click", (event) => {
  if (event.target === textPanel) closeTextMessageModal();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && textPanel && !textPanel.hidden) closeTextMessageModal();
});

audioButton.addEventListener("click", toggleAudioRecording);
stopAudioButton.addEventListener("click", toggleAudioRecording);
acceptCallButton?.addEventListener("click", () => respondIncomingCall("ACCEPTED"));
rejectCallButton?.addEventListener("click", () => respondIncomingCall("REJECTED"));


function getNeighborSetting(key, fallback) {
  const value = localStorage.getItem(key);
  if (value == null) return fallback;
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

function setNeighborSetting(key, value) {
  localStorage.setItem(key, String(value));
}

function openAppSettings() {
  const panel = document.getElementById("appSettingsPanel");
  if (!panel) return;
  const profile = neighborProfile;
  const accountName = profile?.name || profile?.full_name || "Vecino registrado";
  const accountPhone = profile?.phone || "—";
  const accountStatus = profile?.validation_status || profile?.status || "PROVISIONAL_ACTIVE";
  const accountCenter = profile?.control_center_code || "Asignado por GPS";
  document.getElementById("settingsAccountName").textContent = accountName;
  document.getElementById("settingsAccountMeta").textContent = `${accountPhone} · ${accountStatus}`;
  document.getElementById("settingsNeighborName").textContent = accountName;
  document.getElementById("settingsNeighborPhone").textContent = accountPhone;
  document.getElementById("settingsNeighborCenter").textContent = accountCenter;
  document.getElementById("neighborNotifySound").checked = !!getNeighborSetting("neighbor_notify_sound", true);
  document.getElementById("neighborNotifyVibrate").checked = !!getNeighborSetting("neighbor_notify_vibrate", true);
  document.getElementById("neighborPrivacyAck").checked = !!getNeighborSetting("neighbor_privacy_ack", false);
  panel.hidden = false;
}

function closeAppSettings() {
  const panel = document.getElementById("appSettingsPanel");
  if (panel) panel.hidden = true;
}

function saveAppSettings() {
  setNeighborSetting("neighbor_notify_sound", document.getElementById("neighborNotifySound")?.checked ?? true);
  setNeighborSetting("neighbor_notify_vibrate", document.getElementById("neighborNotifyVibrate")?.checked ?? true);
  setNeighborSetting("neighbor_privacy_ack", document.getElementById("neighborPrivacyAck")?.checked ?? false);
}

function logoutNeighbor() {
  if (currentEventId) {
    alert("No puedes salir del perfil mientras hay una alerta activa. Primero vuelve al inicio sin cancelar o cancela la alerta si fue falsa alarma.");
    return;
  }

  clearNeighborProfile();
  closeAppSettings();
  showAuth();
}

const appSettingsButton = document.getElementById("appSettingsButton");
const appSettingsPanel = document.getElementById("appSettingsPanel");
const closeAppSettingsButton = document.getElementById("closeAppSettingsButton");
const openSensorSettingsFromAppButton = document.getElementById("openSensorSettingsFromAppButton");
const editProfileFromSettingsButton = document.getElementById("editProfileFromSettingsButton");
const logoutFromSettingsButton = document.getElementById("logoutFromSettingsButton");

appSettingsButton?.addEventListener("click", openAppSettings);
closeAppSettingsButton?.addEventListener("click", closeAppSettings);
editProfileFromSettingsButton?.addEventListener("click", () => { closeAppSettings(); showRegister(); });
logoutFromSettingsButton?.addEventListener("click", logoutNeighbor);
appSettingsPanel?.addEventListener("click", (event) => { if (event.target === appSettingsPanel) closeAppSettings(); });
["neighborNotifySound", "neighborNotifyVibrate", "neighborPrivacyAck"].forEach((id) => document.getElementById(id)?.addEventListener("change", saveAppSettings));
openSensorSettingsFromAppButton?.addEventListener("click", () => { closeAppSettings(); openSensorSettings(); });
document.getElementById("neighborCheckPermissionsButton")?.addEventListener("click", () => alert("Revisa ubicación, cámara, micrófono y notificaciones en Ajustes del teléfono. La app los pedirá cuando sean necesarios."));

sensorSettingsButton?.addEventListener("click", openSensorSettings);
closeSensorSettingsButton?.addEventListener("click", closeSensorSettings);
sensorSettingsPanel?.addEventListener("click", (event) => {
  if (event.target === sensorSettingsPanel) closeSensorSettings();
});
sensorToggleButton?.addEventListener("click", toggleSensors);
sensorTestButton?.addEventListener("click", startSensorTestMode);
fallOkButton?.addEventListener("click", cancelFallDetection);
fallHelpButton?.addEventListener("click", sendFallDetectedSOS);
videoUploadButton.addEventListener("click", () => videoInput.click());
videoInput.addEventListener("change", uploadSelectedVideo);
registerButton.addEventListener("click", registerNeighbor);
loginButton?.addEventListener("click", loginNeighbor);
requestCodeButton?.addEventListener("click", requestLoginCode);
showRegisterButton?.addEventListener("click", showRegister);
backToLoginButton?.addEventListener("click", showLogin);
verifyCodeButton?.addEventListener("click", verifyOtpCode);
resendCodeButton?.addEventListener("click", resendOtpCode);
otpBackButton?.addEventListener("click", showLogin);
otpCode?.addEventListener("keyup", (event) => {
  if (event.key === "Enter") verifyOtpCode();
});
homeLocationButton.addEventListener("click", useHomeLocation);
editProfileButton?.addEventListener("click", showRegister);
logoutButton?.addEventListener("click", logoutNeighbor);

setInterval(refreshStatus, 5000);
setInterval(() => {
  if (isNeighborRegistered() && !currentEventId) {
    refreshNeighborProfileFromServer();
  }
}, 30000);

async function initializeApp() {
  updateTicketLabels();

  if (currentEventId) {
    eventIdLabel.textContent = currentEventId;
    eventStatus.textContent = "RECUPERANDO";
    statusLabel.textContent = "Recuperando alerta activa...";
    resetCaseProgress();

    if (followupMinimized) {
      updateProfileCard();
      updateResumeFollowupCard("Recuperando seguimiento...");
      showHome({ force: true });
    } else {
      showActiveAlert();
    }

    refreshStatus();
    return;
  }

  if (isNeighborRegistered()) {
    updateProfileCard();
    await refreshNeighborProfileFromServer();
    const recovered = await recoverActiveCase();

    if (recovered) {
      showHome({ force: true });
    } else {
      showHome({ force: true });
    }
  } else {
    showAuth();
  }

  setTimeout(tryAutoStartSensors, 700);
}

initializeApp();


/* --- QA v1 FORCE: ocultar caja técnica no útil para vecino --- */
function hideNeighborTechnicalInfoBox() {
  const ids = ["gpsStatus", "accuracy", "ticketId", "eventId", "statusText"];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;

    const section = el.closest("section") || el.closest(".info") || el.parentElement;
    if (!section) continue;

    section.classList.add("qa-hidden-technical-info");
    section.setAttribute("hidden", "hidden");
    section.setAttribute("aria-hidden", "true");
    section.style.setProperty("display", "none", "important");
    section.style.setProperty("height", "0", "important");
    section.style.setProperty("margin", "0", "important");
    section.style.setProperty("padding", "0", "important");
    section.style.setProperty("overflow", "hidden", "important");
    break;
  }
}

window.addEventListener("DOMContentLoaded", hideNeighborTechnicalInfoBox);
window.addEventListener("load", hideNeighborTechnicalInfoBox);
setTimeout(hideNeighborTechnicalInfoBox, 250);
setTimeout(hideNeighborTechnicalInfoBox, 1000);


/* --- QA v1 FINAL: cierre robusto modal mensaje texto --- */
(function setupTextMessageModalCloseFix() {
  function closeModal() {
    const modal = document.getElementById("textPanel");
    if (!modal) return;

    modal.hidden = true;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.style.setProperty("display", "none", "important");
    document.body.classList.remove("modal-open");
  }

  function openModalPatch() {
    const modal = document.getElementById("textPanel");
    if (!modal) return;

    modal.hidden = false;
    modal.classList.add("is-open");
    modal.removeAttribute("aria-hidden");
    modal.style.removeProperty("display");
    document.body.classList.add("modal-open");

    setTimeout(() => {
      const textarea = document.getElementById("textMessage");
      if (textarea) textarea.focus();
    }, 80);
  }

  // Cierre por click en X, Cancelar o fondo oscuro.
  document.addEventListener("click", function(event) {
    const target = event.target;

    if (
      target?.id === "closeTextPanelButton" ||
      target?.id === "cancelTextPanelButton" ||
      target?.closest?.("#closeTextPanelButton") ||
      target?.closest?.("#cancelTextPanelButton")
    ) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
      return;
    }

    const modal = document.getElementById("textPanel");
    if (modal && target === modal) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  }, true);

  // Cierre por touch en iPhone, antes de que otro listener lo capture.
  document.addEventListener("touchend", function(event) {
    const target = event.target;

    if (
      target?.id === "closeTextPanelButton" ||
      target?.id === "cancelTextPanelButton" ||
      target?.closest?.("#closeTextPanelButton") ||
      target?.closest?.("#cancelTextPanelButton")
    ) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  }, { capture: true, passive: false });

  // Escape en browser.
  window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeModal();
  });

  // Reforzar botón Mensaje para abrir modal.
  window.addEventListener("DOMContentLoaded", function() {
    const textButton = document.getElementById("textButton");
    if (textButton && !textButton.dataset.qaModalOpenFix) {
      textButton.dataset.qaModalOpenFix = "true";
      textButton.addEventListener("click", function(event) {
        event.preventDefault();
        openModalPatch();
      }, true);
    }

    const closeBtn = document.getElementById("closeTextPanelButton");
    const cancelBtn = document.getElementById("cancelTextPanelButton");
    if (closeBtn) closeBtn.type = "button";
    if (cancelBtn) cancelBtn.type = "button";
  });

  // Exponer por si sendTextMessage quiere cerrar después de enviar.
  window.closeTextMessageModal = closeModal;
})();
/* --- END QA v1 FINAL: cierre robusto modal mensaje texto --- */
