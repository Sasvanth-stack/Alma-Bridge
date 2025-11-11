export enum Role {
  Student = 'Student',
  Alumni = 'Alumni',
  Faculty = 'Faculty',
}

export interface User {
  name: string;
  role: Role;
  avatar: string;
}

export type Page = 'Home' | 'Events' | 'Network' | 'Donate' | 'Profile' | 'Notifications';

export interface DonationCampaign {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  image: string;
}

export interface AlumniProfile {
  id: number;
  name:string;
  avatar: string;
  company: string;
  batch: string;
  department: string;
  location: string;
  connected: boolean;
}

export enum RSVPStatus {
  Going = 'Going',
  Interested = 'Interested',
  NotGoing = 'Not Going',
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  type: 'Workshop' | 'Seminar' | 'Networking' | 'Reunion';
  rsvp?: RSVPStatus;
}

export interface FeedItem {
  id: number;
  authorId: number; // Links to AlumniProfile
  timestamp: Date;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

export interface Notification {
  id: number;
  type: 'like' | 'comment' | 'event' | 'connection';
  message: string;
  timestamp: Date;
  read: boolean;
}

// FIX: Add JobType enum for Jobs page
export enum JobType {
  FullTime = 'Full-time',
  Internship = 'Internship',
}

// FIX: Add Job interface for Jobs page
export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  description: string;
  type: JobType;
  postedBy: string; // Name of alumni who posted
}

// FIX: Add Mentor interface for Mentorship page
export interface Mentor {
  id: number;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
}
