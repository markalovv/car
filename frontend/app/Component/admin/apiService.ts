import axios from 'axios';

const API_BASE_URL = 'http://localhost:3340/api';

export interface Booking {
  id: number;
  fullName: string;
  phone: string;
  appointmentDate: string;
  timeSlot: string;
  carModel: string;
  isInspectorRequired: boolean;
  createdAt: string;
}

export interface CreateBookingRequest {
  fullName: string;
  phone: string;
  appointmentDate: string;
  timeSlot: string;
  carModel: string;
  isInspectorRequired?: boolean;
}

export interface UpdateBookingRequest {
  fullName?: string;
  phone?: string;
  appointmentDate?: string;
  timeSlot?: string;
  carModel?: string;
  isInspectorRequired?: boolean;
}

class ApiService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Get all bookings with pagination
  async getBookings(skip = 0, limit = 100): Promise<Booking[]> {
    const response = await this.api.get(`/bookings?skip=${skip}&limit=${limit}`);
    return response.data;
  }

  // Get booking by ID
  async getBooking(id: number): Promise<Booking> {
    const response = await this.api.get(`/bookings/${id}`);
    return response.data;
  }

  // Create new booking
  async createBooking(booking: CreateBookingRequest): Promise<Booking> {
    const response = await this.api.post('/bookings', booking);
    return response.data;
  }

  // Update booking
  async updateBooking(id: number, booking: UpdateBookingRequest): Promise<Booking> {
    const response = await this.api.put(`/bookings/${id}`, booking);
    return response.data;
  }

  // Delete booking
  async deleteBooking(id: number): Promise<void> {
    await this.api.delete(`/bookings/${id}`);
  }
}

export const apiService = new ApiService();