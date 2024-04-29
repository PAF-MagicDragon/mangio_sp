export const TYPE_MAIN_DOCTOR = 0;
export const TYPE_MAIN_PATIENT = 1;
export const TYPE_SUB_DOCTOR = 2;
export const TYPE_SUB_PATIENT = 3;

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 0;

export const TEMPLATES = [
  ["1", "Biogesic", "B1", "tablet", 1],
  ["2", "Bonamine", "B2", "syrup", 1],
  ["3", "A3", "B3", "C3", 1],
  ["4", "A4", "B4", "C4", 1],
  ["5", "A5", "B5", "C5", 1],
  ["6", "A6", "B6", "C6", 1],
  ["7", "A7", "B7", "C7", 1],
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
  { value: 1, label: "If required" },
  { value: 2, label: "Immediately" },
  { value: 3, label: "Once a day" },
  { value: 4, label: "Twice Daily" },
  { value: 5, label: "Thrice Daily" },
  { value: 6, label: "Four Times a day" },
  { value: 7, label: "Every hour" },
  { value: 8, label: "Every night at bedtime" },
  { value: 9, label: "Every day" },
  { value: 10, label: "Every other day" },
  { value: 11, label: "Every four hours" },
  { value: 12, label: "Once a week" },
  { value: 13, label: "Three times a week" },
];

export const LIST_TYPE = [
  { value: 1, label: "Days" },
  { value: 2, label: "Weeks" },
  { value: 3, label: "Months" },
];
