export interface Agency {
  id: number;
  name: string;
  description: string;
  ruc: string;
  contactEmail: string;
  contactPhone: string;
  userId?: number;
}

export interface Staff {
  id: number;
  agencyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}
