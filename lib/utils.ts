export function calculateCommission(amount:number): number {
    return amount * 0.15;
}

// Calculate talent earnings after commission
export function calculateTalentEarnings(amount: number, tip: number = 0): number {
    const afterCommission = amount - calculateCommission(amount);
    return afterCommission + tip;
}

// Nigerian states
export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// Validate Nigerian phone number
export function validateNigerianPhone(phone: string): boolean {
    const pattern = /^(\+234|0)[789][01]\d{8}$/;
    return pattern.test(phone)
}

// Generate transaction reference
export function generateTransactionRef(): string {
    return 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}