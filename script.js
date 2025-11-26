/*
  Kalyan Connection — Complete Frontend Prototype
  - Static JSON data for hospitals/doctors/medicine shops
  - Profile/login with DOB, height, weight saved in localStorage
  - Document view + print
  - Location-based filtering (geolocation)
  - Multilingual UI
*/

// ----------------------------
// Static JSON data
// ----------------------------
const STATIC = {
  userSample: { name: "Guest" },

  hospitals: [
    { id: "H1", name: "Kalyan General Hospital", lat: 19.2405, lon: 73.1350, icu_beds: 6, budget: 2000, specialties: ["cardiology","general","trauma"], phone: "02212345601" },
    { id: "H2", name: "Sai Trauma Centre", lat: 19.2452, lon: 73.1406, icu_beds: 3, budget: 1500, specialties: ["trauma","orthopaedics"], phone: "02212345602" },
    { id: "H3", name: "Rural Health Clinic", lat: 19.2288, lon: 73.1234, icu_beds: 0, budget: 500, specialties: ["general","maternity"], phone: "02212345603" },
    { id: "H4", name: "Metro Cardiac Care", lat: 19.2500, lon: 73.1420, icu_beds: 8, budget: 3500, specialties: ["cardiology"], phone: "02212345604" }
  ],

  doctors: [
    { id:"D1", name:"Dr. Ramesh Kumar", specialty:"cardiology", fees:1500, hospitalId:"H4", lat:19.2500, lon:73.1420, phone:"0229001001", lang:["en","hi"] },
    { id:"D2", name:"Dr. Saira Khan", specialty:"general", fees:500, hospitalId:"H1", lat:19.2405, lon:73.1350, phone:"0229001002", lang:["en","bn"] },
    { id:"D3", name:"Dr. Priya Patel", specialty:"maternity", fees:700, hospitalId:"H3", lat:19.2288, lon:73.1234, phone:"0229001003", lang:["en","raj","hi"] },
    { id:"D4", name:"Dr. Arjun Singh", specialty:"trauma", fees:1000, hospitalId:"H2", lat:19.2452, lon:73.1406, phone:"0229001004", lang:["en","hi"] },
    { id:"D5", name:"Dr. Neha Bose", specialty:"pulmonology", fees:1200, hospitalId:"H1", lat:19.2406, lon:73.1352, phone:"0229001005", lang:["en","bn"] }
  ],

  medicine_shops: [
    { id:"M1", name:"Kalyan Meds", lat:19.2410, lon:73.1345, phone:"0228002001", open:"08:00-22:00" },
    { id:"M2", name:"Quick Pharmacy", lat:19.2460, lon:73.1410, phone:"0228002002", open:"24/7" },
    { id:"M3", name:"Village Health Store", lat:19.2290, lon:73.1240, phone:"0228002003", open:"09:00-20:00" }
  ]
};

// ----------------------------
// Simple translations
// ----------------------------
const TRANSLATIONS = {
  en: { "Search results":"Search results","No search yet":"No search yet","Health Issue":"Health Issue","Sort results":"Sort results","Send Emergency Request":"Send Emergency Request","Nearby Medicine Finder":"Nearby Medicine Finder","Emergency Helplines":"Emergency Helplines","First Aid Quick Guide":"First Aid Quick Guide","Map (simulated)":"Map (simulated)","Selected Entity Details":"Selected Entity Details","Not logged in":"Not logged in","Login/Register":"Login/Register","Toggle Hospital/Doctor":"Toggle Hospital/Doctor","Bleeding":"Bleeding","Apply pressure over wound; raise limb; seek help.":"Apply pressure over wound; raise limb; seek help.","Choking":"Choking","Encourage coughing; back blows; Heimlich maneuver for adults.":"Encourage coughing; back blows; Heimlich maneuver for adults.","Burns":"Burns","Cool with running water for 10 mins; cover with cling film; don't apply oil.":"Cool with running water for 10 mins; cover with cling film; don't apply oil.","Suspected Heart Attack":"Suspected Heart Attack","Call ambulance; make person sit; loosen clothing; give aspirin if not allergic.":"Call ambulance; make person sit; loosen clothing; give aspirin if not allergic." },
  hi: { "Search results":"खोज परिणाम","No search yet":"अभी तक खोज नहीं हुई","Health Issue":"स्वास्थ्य समस्या","Sort results":"क्रमबद्ध करें","Send Emergency Request":"इमरजेंसी अनुरोध भेजें","Nearby Medicine Finder":"निकटतम दवा की दुकानें","Emergency Helplines":"आपातकालीन हेल्पलाइन","First Aid Quick Guide":"प्राथमिक चिकित्सा मार्गदर्शिका","Map (simulated)":"नक्शा (अनुकरण)","Selected Entity Details":"किसी चयनित का विवरण","Not logged in":"लॉगिन नहीं हुआ","Login/Register":"लॉगिन / रजिस्टर","Toggle Hospital/Doctor":"अस्पताल/डॉक्टर बदलें","Bleeding":"खून बहना","Apply pressure over wound; raise limb; seek help.":"घाव पर दबाव दें; घुटने ऊँचा रखें; मदद लें।","Choking":"घुटना","Encourage coughing; back blows; Heimlich maneuver for adults.":"खांसी करने के लिए कहें; पीठ पर थप्पड़; बड़े के लिए हाईमलिक तरीका।","Burns":"जलना","Cool with running water for 10 mins; cover with cling film; don't apply oil.":"10 मिनट ठंडे पानी से ठंडा करें; कवर करें; तेल न लगाएँ।","Suspected Heart Attack":"संदिग्ध दिल का दौरा","Call ambulance; make person sit; loosen clothing; give aspirin if not allergic.":"एम्बुलेंस बुलाएँ; व्यक्ति को बैठाएँ; कपड़े ढीले करें; यदि एलर्जी न हो तो एस्पिरिन दें।" },
  raj: { "Search results":"खोज नतीजा","No search yet":"अभी खोजनो कोनी","Health Issue":"सेहत री समस्या","Sort results":"सॉर्ट करो","Send Emergency Request":"इमरजेंसी भेजो","Nearby Medicine Finder":"नजदीकी दवा दुकान","Emergency Helplines":"इमरजेंसी नंबर","First Aid Quick Guide":"फर्स्ट एड गाइड","Map (simulated)":"नक्शो (नकल)","Selected Entity Details":"विवरण","Not logged in":"लॉगिन कोनी","Login/Register":"लॉगइन / रजिस्टर","Toggle Hospital/Doctor":"अस्पताल/डॉक्टर बदलो","Bleeding":"खून बहनो","Apply pressure over wound; raise limb; seek help.":"घाव पे दबाव डालो; अंग ऊपर करो; मदद बोलो।","Choking":"गला अटकणो","Encourage coughing; back blows; Heimlich maneuver for adults.":"खाँसण बतावो; पीट पर ठोको; बड़ा खातर Heimlich करो।","Burns":"जलण","Cool with running water for 10 mins; cover with cling film; don't apply oil.":"ठंडा पानी 10 मिनट; ढांको; तेल मत लगावो।","Suspected Heart Attack":"हृदय हमला सन्देह","Call ambulance; make person sit; loosen clothing; give aspirin if not allergic.":"एम्बुलेंस बोलाओ; ब्यक्ति ने बैठाओ; कपड़ा ढीला करो; एलर्जी ना हो तो एस्पिरिन दो।" },
  bn: { "Search results":"অনুসন্ধানের ফলাফল","No search yet":"এখনো অনুসন্ধান হয়নি","Health Issue":"স্বাস্থ্য সমস্যা","Sort results":"ক্রম অনুসারে সাজান","Send Emergency Request":"জরুরী অনুরোধ প্রেরণ","Nearby Medicine Finder":"নিকটস্থ ফার্মেসি","Emergency Helplines":"জরুরী হেল্পলাইন","First Aid Quick Guide":"প্রাথমিক চিকিৎসা নির্দেশিকা","Map (simulated)":"মানচিত্র (অনুকরণ)","Selected Entity Details":"নির্বাচিত বিবরণ","Not logged in":"লগইন করা নেই","Login/Register":"লগইন / রেজিস্টার","Toggle Hospital/Doctor":"হাসপাতাল/ডাক্তার পরিবর্তন","Bleeding":"রক্তপাত","Apply pressure over wound; raise limb; seek help.":"আঘাতস্থলে চাপ দিন; অঙ্গ উঁচু করুন; সাহায্য নিন।","Choking":"গলাভরা","Encourage coughing; back blows; Heimlich maneuver for adults.":"কাঁশি দিতে বলুন; পিঠে ধাক্কা; বড়দের জন্য হেইমলিক।","Burns":"পোড়া","Cool with running water for 10 mins; cover with cling film; don't apply oil.":"10 মিনিট ঠাণ্ডা পানি দিন; ঢেকে রাখুন; তেল লাগাবেন না।","Suspected Heart Attack":"সম্ভাব্য হার্ট অ্যাটাক","Call ambulance; make person sit; loosen clothing; give aspirin if not allergic.":"অ্যাম্বুল্যান্স ডাকুন; কামড় নেবেন; কাপড় ঢিলা করুন; এলার্জি না হলে অ্যাস্পিরিন দিন।" }
};

// ----------------------------
// UI element references
// ----------------------------
const elements = {
  lang: document.getElementById('lang'),
  userDisplay: document.getElementById('userDisplay'),
  btnLogin: document.getElementById('btnLogin'),
  modal: document.getElementById('modal'),
  closeModal: document.getElementById('closeModal'),
  saveProfile: document.getElementById('saveProfile'),
  inpName: document.getElementById('inpName'),
  inpPhone: document.getElementById('inpPhone'),
  inpAadhaar: document.getElementById('inpAadhaar'),
  inpDOB: document.getElementById('inpDOB'),
  inpHeight: document.getElementById('inpHeight'),
  inpWeight: document.getElementById('inpWeight'),
  healthIssue: document.getElementById('healthIssue'),
  sendRequest: document.getElementById('sendRequest'),
  useLocation: document.getElementById('useLocation'),
  results: document.getElementById('results'),
  resultsTitle: document.getElementById('resultsTitle'),
  resultsSubtitle: document.getElementById('resultsSubtitle'),
  toggleView: document.getElementById('toggleView'),
  details: document.getElementById('details'),
  medicineList: document.getElementById('medicineList'),
  mapSim: document.getElementById('mapSim'),
  sortSelect: document.getElementById('sortSelect'),
  // doc/profile related
  openDocBtn: document.getElementById('openDocBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  docView: document.getElementById('docView'),
  doc_name: document.getElementById('doc_name'),
  doc_phone: document.getElementById('doc_phone'),
  doc_dob: document.getElementById('doc_dob'),
  doc_aadhaar: document.getElementById('doc_aadhaar'),
  doc_height: document.getElementById('doc_height'),
  doc_weight: document.getElementById('doc_weight'),
  doc_saved: document.getElementById('doc_saved'),
  printDoc: document.getElementById('printDoc')
};

// ----------------------------
// App state
// ----------------------------
let state = {
  user: null,
  view: 'hospital', // or 'doctor'
  lang: 'en',
  coords: null, // {lat, lon}
  lastSearch: null
};

// ----------------------------
// Utility: Haversine distance (km)
// ----------------------------
function toRad(deg){ return deg * Math.PI / 180; }
function haversine(lat1, lon1, lat2, lon2){
  const R = 6371.0; // km
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ----------------------------
// Localization helper
// ----------------------------
function t(key){
  const map = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
  return map[key] || key;
}
function applyTranslations(){
  elements.resultsTitle.textContent = t("Search results");
  elements.resultsSubtitle.textContent = t("No search yet");
  document.getElementById('lblHealth').textContent = t("Health Issue");
  document.getElementById('lblBudget').textContent = t("Sort results");
  elements.sendRequest.textContent = t("Send Emergency Request");
  const helplinesLabel = document.querySelector('.helplines')?.previousElementSibling;
  if(helplinesLabel) helplinesLabel.textContent = t("Emergency Helplines");
  document.querySelectorAll('.first-aid-item strong')[0].textContent = t("Bleeding");
  document.getElementById('fa-bleed').textContent = t("Apply pressure over wound; raise limb; seek help.");
  document.getElementById('fa-title-choke').textContent = t("Choking");
  document.getElementById('fa-choke').textContent = t("Encourage coughing; back blows; Heimlich maneuver for adults.");
  document.getElementById('fa-title-burn').textContent = t("Burns");
  document.getElementById('fa-burn').textContent = t("Cool with running water for 10 mins; cover with cling film; don't apply oil.");
  document.getElementById('fa-title-heart').textContent = t("Suspected Heart Attack");
  document.getElementById('fa-heart').textContent = t("Call ambulance; make person sit; loosen clothing; give aspirin if not allergic.");
  elements.toggleView.textContent = t("Toggle Hospital/Doctor");
  document.getElementById('mapSim').setAttribute('aria-label', t("Map (simulated)"));
  updateUserDisplay();
}

// ----------------------------
// Login/Register (localStorage) + Profile with DOB/height/weight
// ----------------------------
function openModal(){
  elements.modal.style.display = 'flex';
  const p = JSON.parse(localStorage.getItem('kc_profile') || 'null');
  if(p){
    elements.inpName.value = p.name || '';
    elements.inpPhone.value = p.phone || '';
    elements.inpAadhaar.value = p.aadhaar || '';
    elements.inpDOB.value = p.dob || '';
    elements.inpHeight.value = p.height || '';
    elements.inpWeight.value = p.weight || '';
  } else {
    elements.inpName.value = '';
    elements.inpPhone.value = '';
    elements.inpAadhaar.value = '';
    elements.inpDOB.value = '';
    elements.inpHeight.value = '';
    elements.inpWeight.value = '';
  }
}
function closeModal(){ elements.modal.style.display = 'none'; }

function saveProfile(){
  // gather values and save under kc_profile
  const prof = {
    name: elements.inpName.value.trim() || '',
    phone: elements.inpPhone.value.trim() || '',
    aadhaar: elements.inpAadhaar.value.trim() || '',
    dob: elements.inpDOB.value || '',
    height: elements.inpHeight.value || '',
    weight: elements.inpWeight.value || '',
    savedAt: new Date().toISOString()
  };
  localStorage.setItem('kc_profile', JSON.stringify(prof));
  state.user = prof;
  updateUserDisplay(prof);
  closeModal();
  // automatically show document after saving
  showDocument(prof);
}

function updateUserDisplay(p){
  const profile = p || state.user || JSON.parse(localStorage.getItem('kc_profile') || 'null');
  if(profile){
    elements.userDisplay.textContent = `${profile.name || 'User'}${profile.phone ? ' · '+profile.phone : ''}`;
    elements.btnLogin.textContent = 'Profile';
    elements.openDocBtn.disabled = false;
  } else {
    elements.userDisplay.textContent = t("Not logged in");
    elements.btnLogin.textContent = t("Login/Register");
    elements.openDocBtn.disabled = true;
  }
}

// ----------------------------
// Geolocation
// ----------------------------
function fetchLocation(){
  if(!navigator.geolocation){ alert("Geolocation not supported."); return; }
  elements.mapSim.textContent = "Fetching location...";
  navigator.geolocation.getCurrentPosition(pos=>{
    state.coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
    elements.mapSim.textContent = `Location: ${state.coords.lat.toFixed(5)}, ${state.coords.lon.toFixed(5)}`;
  }, err=>{
    elements.mapSim.textContent = "Location permission denied or unavailable.";
    console.error(err);
  }, { enableHighAccuracy:true, maximumAge:60000 });
}

// ----------------------------
// Perform search (core)
// ----------------------------
function performSearch(){
  if(!state.coords){ alert("Please allow location or click the location button (📍)."); return; }
  const issue = elements.healthIssue.value;
  const sortBy = elements.sortSelect.value;
  const issueMap = {
    heart: ["cardiology"],
    injury: ["trauma","orthopaedics"],
    fever: ["general","infection"],
    pregnancy: ["maternity"],
    asthma: ["pulmonology"],
    other: []
  };
  const want = issueMap[issue] || [];

  const hospitals = STATIC.hospitals.map(h => ({ ...h, distance_km: haversine(state.coords.lat, state.coords.lon, h.lat, h.lon) }));
  const doctors = STATIC.doctors.map(d => ({ ...d, distance_km: haversine(state.coords.lat, state.coords.lon, d.lat, d.lon) }));
  const medicines = STATIC.medicine_shops.map(m => ({ ...m, distance_km: haversine(state.coords.lat, state.coords.lon, m.lat, m.lon) }));

  let filteredDoctors = doctors;
  if(want.length>0) filteredDoctors = doctors.filter(d => want.includes(d.specialty));

  let filteredHospitals = hospitals;
  if(want.length>0) filteredHospitals = hospitals.filter(h => h.specialties.some(s => want.includes(s)));

  if(sortBy === 'distance'){
    filteredHospitals.sort((a,b)=>a.distance_km-b.distance_km);
    filteredDoctors.sort((a,b)=>a.distance_km-b.distance_km);
    medicines.sort((a,b)=>a.distance_km-b.distance_km);
  } else {
    filteredHospitals.sort((a,b)=>a.budget-b.budget);
    filteredDoctors.sort((a,b)=>a.fees-b.fees);
    medicines.sort((a,b)=>a.distance_km-b.distance_km);
  }

  state.lastSearch = { hospitals: filteredHospitals, doctors: filteredDoctors, medicines };
  updateResultsUI();
  updateMedicineUI();
  elements.resultsSubtitle.textContent = `${filteredHospitals.length} hospitals · ${filteredDoctors.length} doctors · ${medicines.length} medicine shops nearby`;
}

// ----------------------------
// UI: render results
// ----------------------------
function updateResultsUI(){
  const container = elements.results;
  container.innerHTML = '';
  if(!state.lastSearch) return;

  if(state.view === 'hospital'){
    state.lastSearch.hospitals.forEach(h=>{
      const div = document.createElement('div');
      div.className = 'result';
      div.innerHTML = `
        <div class="left">
          <div style="font-weight:700">${h.name}</div>
          <div class="small">${h.specialties.join(', ')} · ICU: ${h.icu_beds}</div>
          <div class="tags"><span class="tag">${h.phone}</span><span class="tag">Budget ₹${h.budget}</span></div>
        </div>
        <div style="text-align:right">
          <div class="distance">${h.distance_km.toFixed(2)} km</div>
          <div class="budget">₹${h.budget}</div>
          <div style="margin-top:8px;"><button class="pill" onclick="selectEntity('hospital','${h.id}')">Details</button></div>
        </div>
      `;
      container.appendChild(div);
    });
  } else {
    state.lastSearch.doctors.forEach(d=>{
      const div = document.createElement('div');
      div.className = 'result';
      div.innerHTML = `
        <div class="left">
          <div style="font-weight:700">${d.name} <span style="font-weight:600;color:var(--muted);font-size:13px">(${d.specialty})</span></div>
          <div class="small">At ${getHospitalName(d.hospitalId)} · Languages: ${d.lang.join(', ')}</div>
          <div class="tags"><span class="tag">${d.phone}</span><span class="tag">Fees ₹${d.fees}</span></div>
        </div>
        <div style="text-align:right">
          <div class="distance">${d.distance_km.toFixed(2)} km</div>
          <div class="budget">₹${d.fees}</div>
          <div style="margin-top:8px;"><button class="pill" onclick="selectEntity('doctor','${d.id}')">Details</button></div>
        </div>
      `;
      container.appendChild(div);
    });
  }
}

function updateMedicineUI(){
  const list = elements.medicineList;
  if(!state.lastSearch) return;
  const meds = state.lastSearch.medicines.slice(0,5);
  list.innerHTML = meds.map(m => `<div><strong>${m.name}</strong> · ${m.distance_km.toFixed(2)} km · ${m.open} · <a href="tel:${m.phone}">Call</a></div>`).join('');
}

function getHospitalName(id){
  const h = STATIC.hospitals.find(x=>x.id===id);
  return h ? h.name : id;
}

window.selectEntity = function(type, id){
  const d = document.getElementById('details');
  d.innerHTML = '';
  if(type==='hospital'){
    const h = (state.lastSearch && state.lastSearch.hospitals.find(x=>x.id===id)) || STATIC.hospitals.find(x=>x.id===id);
    if(!h) return;
    d.innerHTML = `
      <div style="font-weight:700">${h.name}</div>
      <div class="small">Specialties: ${h.specialties.join(', ')}</div>
      <div class="small">ICU Beds: ${h.icu_beds} · Budget ₹${h.budget}</div>
      <div class="small">Distance: ${h.distance_km ? h.distance_km.toFixed(2)+' km' : 'N/A'}</div>
      <div style="margin-top:8px"><button class="btn" onclick="location.href='tel:${h.phone}'">Call ${h.phone}</button> <button class="pill" onclick="navigateTo(${h.lat},${h.lon})">Navigate</button></div>
    `;
  } else {
    const doc = (state.lastSearch && state.lastSearch.doctors.find(x=>x.id===id)) || STATIC.doctors.find(x=>x.id===id);
    if(!doc) return;
    d.innerHTML = `
      <div style="font-weight:700">${doc.name}</div>
      <div class="small">Specialty: ${doc.specialty} · Languages: ${doc.lang.join(', ')}</div>
      <div class="small">Fees: ₹${doc.fees} · At: ${getHospitalName(doc.hospitalId)}</div>
      <div class="small">Distance: ${doc.distance_km ? doc.distance_km.toFixed(2)+' km' : 'N/A'}</div>
      <div style="margin-top:8px"><button class="btn" onclick="location.href='tel:${doc.phone}'">Call ${doc.phone}</button> <button class="pill" onclick="navigateTo(${doc.lat},${doc.lon})">Navigate</button></div>
    `;
  }
};

function navigateTo(lat, lon){
  if(!state.coords){ alert("No location. Please allow location"); return; }
  const origin = `${state.coords.lat},${state.coords.lon}`;
  const dest = `${lat},${lon}`;
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
  window.open(url, '_blank');
}

// ----------------------------
// Document / profile functions (the snippet you provided integrated)
// ----------------------------
const els = {
  name: document.getElementById('inpName'),
  phone: document.getElementById('inpPhone'),
  aadhaar: document.getElementById('inpAadhaar'),
  dob: document.getElementById('inpDOB'),
  height: document.getElementById('inpHeight'),
  weight: document.getElementById('inpWeight'),
  saveBtn: document.getElementById('saveProfile'),
  closeBtn: document.getElementById('closeModal'),
  userDisplay: document.getElementById('userDisplay'),
  btnLogin: document.getElementById('btnLogin'),
  docView: document.getElementById('docView'),
  doc_name: document.getElementById('doc_name'),
  doc_phone: document.getElementById('doc_phone'),
  doc_dob: document.getElementById('doc_dob'),
  doc_aadhaar: document.getElementById('doc_aadhaar'),
  doc_height: document.getElementById('doc_height'),
  doc_weight: document.getElementById('doc_weight'),
  doc_saved: document.getElementById('doc_saved'),
  openDocBtn: document.getElementById('openDocBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  printDoc: document.getElementById('printDoc'),
  saveMessage: null
};

function loadProfile(){
  const p = JSON.parse(localStorage.getItem('kc_profile') || 'null');
  if(!p) return null;
  // populate modal inputs (if available)
  if(els.name) els.name.value = p.name || '';
  if(els.phone) els.phone.value = p.phone || '';
  if(els.aadhaar) els.aadhaar.value = p.aadhaar || '';
  if(els.dob) els.dob.value = p.dob || '';
  if(els.height) els.height.value = p.height || '';
  if(els.weight) els.weight.value = p.weight || '';
  updateUserDisplay(p);
  return p;
}

function showDocument(p){
  const prof = p || JSON.parse(localStorage.getItem('kc_profile') || 'null');
  if(!prof) return;
  els.doc_name.textContent = prof.name || '-';
  els.doc_phone.textContent = prof.phone || '-';
  // format dob nicely
  let dobText = prof.dob || '-';
  if(prof.dob){
    const d = new Date(prof.dob);
    dobText = d.toLocaleDateString();
  }
  els.doc_dob.textContent = dobText;
  els.doc_aadhaar.textContent = prof.aadhaar || '-';
  els.doc_height.textContent = prof.height || '-';
  els.doc_weight.textContent = prof.weight || '-';
  const saved = prof.savedAt ? new Date(prof.savedAt).toLocaleString() : new Date().toLocaleString();
  els.doc_saved.textContent = saved;
  els.docView.style.display = 'block';
  // enable openDoc button
  if(els.openDocBtn) els.openDocBtn.disabled = false;
}

function hideDocument(){ if(els.docView) els.docView.style.display = 'none'; }

// simple print
function printDocument(){
  const prof = JSON.parse(localStorage.getItem('kc_profile') || 'null');
  if(!prof){ alert('No profile to print'); return; }
  const dobText = prof.dob ? new Date(prof.dob).toLocaleDateString() : '-';
  const html = `
<html><head><title>Personal Document - ${prof.name || ''}</title>
<style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;} .row{margin-bottom:8px}</style>
</head><body>
<h2>Personal Document</h2>
<div class="row"><strong>Name:</strong> ${prof.name || '-'}</div>
<div class="row"><strong>Phone:</strong> ${prof.phone || '-'}</div>
<div class="row"><strong>Date of Birth:</strong> ${dobText}</div>
<div class="row"><strong>Aadhaar:</strong> ${prof.aadhaar || '-'}</div>
<div class="row"><strong>Height (cm):</strong> ${prof.height || '-'}</div>
<div class="row"><strong>Weight (kg):</strong> ${prof.weight || '-'}</div>
<div style="margin-top:20px;color:#666;font-size:12px;">Saved from Kalyan Connection prototype.</div>
</body></html>
`;
  const w = window.open('', '_blank');
  w.document.write(html);
  w.document.close();
  w.print();
}

// bindings for document/profile
if(els.saveBtn) els.saveBtn.addEventListener('click', saveProfile);
if(els.closeBtn) els.closeBtn.addEventListener('click', closeModal);
if(els.openDocBtn) els.openDocBtn.addEventListener('click', ()=> showDocument());
if(els.logoutBtn) els.logoutBtn.addEventListener('click', ()=>{ if(confirm('Logout (clear profile view)?')){ hideDocument(); updateUserDisplay(null); }});
if(els.printDoc) els.printDoc.addEventListener('click', printDocument);

// ----------------------------
// Event bindings (general)
// ----------------------------
elements.btnLogin.addEventListener('click', ()=> openModal());
elements.lang.addEventListener('change', (e)=> { state.lang = e.target.value; applyTranslations(); });
elements.useLocation.addEventListener('click', fetchLocation);
elements.sendRequest.addEventListener('click', performSearch);
elements.toggleView.addEventListener('click', ()=> { state.view = (state.view==='hospital') ? 'doctor' : 'hospital'; updateResultsUI(); });
elements.sortSelect.addEventListener('change', ()=> { if(state.lastSearch) performSearch(); });

// load initial user and state
(function init(){
  state.lang = 'en';
  const p = loadProfile();
  if(p) showDocument(p);

  const u = JSON.parse(localStorage.getItem('kc_user') || 'null');
  if(u) state.user = u;
  applyTranslations();

  // fallback coordinates (Kalyan area) for demo
  state.coords = { lat: 19.2405, lon: 73.1350 };
  elements.mapSim.textContent = `Using default location: ${state.coords.lat.toFixed(5)}, ${state.coords.lon.toFixed(5)} (click 📍 to use your device location)`;
})();