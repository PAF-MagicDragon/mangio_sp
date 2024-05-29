export const TYPE_MAIN_DOCTOR = 0;
export const TYPE_MAIN_PATIENT = 1;
export const TYPE_SUB_DOCTOR = 2;
export const TYPE_SUB_PATIENT = 3;

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 0;

export const STATUS_COMPLETED = 1;
export const STATUS_PENDING = 0;

export const CHANNEL_ID = "expresscript-id";
export const CHANNEL_NAME = "Expresscript Channel";

export const TEMPLATES = [
  ["1", "Panadol", "Acetaminophen", "tablet", 1],
  ["2", "Excedrine", "Acetaminophen", "syrup", 1],
  ["3", "Sinutab", "Acetaminophen", "tablet", 1],
  ["4", "Tylenol PM", "Acetaminophen", "tablet", 1],
  ["5", "Benadryl", "Diphenhydramine", "syrup", 1],
  ["6", "Aleve", "Naproxen", "tablet", 1],
  ["7", "Sudafed", "Pseudoephedrine", "syrup", 1],
  ["8", "Bufferin", "Aspirin", "tablet", 1],
  ["9", "Advil", "Ibuprofen", "capsule", 1],
];

export const LIST_PREPARATION = [
  { value: 1, label: "Tab." },
  { value: 2, label: "Cap." },
  { value: 3, label: "Softgel" },
  { value: 4, label: "Inj." },
  { value: 5, label: "Syr." },
  { value: 6, label: "Drops" },
  { value: 7, label: "Ointment" },
  { value: 8, label: "Suppository" },
];

export const LIST_ROUTE = [
  { value: 1, label: "Topical" },
  { value: 2, label: "Oral" },
  { value: 3, label: "Rectal" },
  { value: 4, label: "Vaginal" },
  { value: 5, label: "Urethral" },
  { value: 6, label: "Inhalation" },
  { value: 7, label: "Local" },
  { value: 8, label: "Chew" },
  { value: 9, label: "Suck" },
  { value: 10, label: "Intradermal" },
  { value: 11, label: "Subcutaneous" },
  { value: 12, label: "Intramuscular" },
  { value: 13, label: "Intravenous" },
  { value: 14, label: "Nasal" },
  { value: 15, label: "Ear Drops" },
  { value: 16, label: "Eye Drops" },
];

export const LIST_DIRECTION = [
  { value: 1, label: "Before Meals" },
  { value: 2, label: "After Meals" },
];

export const LIST_FREQUENCY = [
  // { value: 1, label: "If required" },
  // { value: 2, label: "Immediately" },
  { value: 3, label: "Once a day" },
  { value: 4, label: "Every 12 hours" },
  { value: 5, label: "Every 8 hours" },
  { value: 6, label: "Every 6 hours" },
  { value: 7, label: "Every hour" },
  // { value: 8, label: "Every night at bedtime" },
  // { value: 9, label: "Every day" },
  // { value: 10, label: "Every other day" },
  // { value: 11, label: "Every four hours" },
  // { value: 12, label: "Once a week" },
  // { value: 13, label: "Three times a week" },
];

export const LIST_TYPE = [
  { value: 1, label: "Days" },
  { value: 2, label: "Weeks" },
  { value: 3, label: "Months" },
];

export const LIST_GENDER = [
  { value: GENDER_MALE, label: "Male" },
  { value: GENDER_FEMALE, label: "Female" },
];

export const LIST_STATUS = [
  { value: STATUS_COMPLETED, label: "Completed" },
  { value: STATUS_PENDING, label: "Pending" },
];

export const HTML_TEMPLATE =
  "<style>html{height:100%}body{height:842px;width:595px;font-family:Helvetica;font-size:16px;margin:0 50px 0 50px}td,th{padding:2px}table{border-collapse:collapse}td{min-width:50px}th{min-width:50px;text-align:left}hr{height:2px;border-width:0;color:gray;background-color:gray}img{float:right;min-height:100px;min-width:100px;max-height:100px;max-width:100px}.centerText{text-align:center}.centerMargin{margin-right:auto;margin-left:auto}.container{height:100%;width:100%;border-collapse:collapse}.drugs{margin-right:auto;margin-left:auto;font-family:Helvetica;font-size:25px}.header{height:200px}.footer1{height:10px}.footer2{height:100px}.header1{font-size:20px;text-align:center}.line1{padding-top:20px;font-size:22px}.line2{font-size:20px}.line3{font-size:20px;font-style:italic}</style><table class=container><tr class=header><td colspan=2 valign=top><table class=centerMargin><tr><th class=header1>[clinicHospital]<tr><th class=centerText>[doctorName]<tr><td class=centerText>[doctorAddress]<tr><td class=centerText>[doctorContactNo] | [doctorEmail]</table><hr><table class=centerMargin><tr><td>Name:<th>[patientName]<td>Date:<th>[prescriptionDate]<tr><td>Address<th>[patientAddress]<td>Age:<th>[patientAge]<tr><td>Height:<th>[patientHeight]<td>Weight:<th>[patientWeight]<tr><td>Diagnosis:<th>[prescriptionDiagnosis]<td>Notes:<th>[prescriptionNotes]</table><h1>Rx</h1><tr><td colspan=2 valign=top><table class=drugs>[drugContent]</table><tr class=footer1><td colspan=2 valign=bottom><hr><tr class=footer2><td><table class=centerMargin><tr><td>Doctor's Signature:<th>[doctorSignature]<tr><td>License No:<th>[doctorLicenseNo]<tr><td>PTR No.:<th>[doctorPtrNo]</table><td>[qrContent]";

export const DRUG_TEMPLATE =
  "<tr><td class=line1 colspan=2>[drugDetails]<tr><tr><td class=line2 colspan=2>[drugDetails2]<tr><th>Sig.<td class=line3>[drugInstructions]";

export const IMG_TEMPLATE =
  "<img src='data:image/png;base64,[encryptedString]'>";
