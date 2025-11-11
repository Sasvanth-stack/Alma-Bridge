// FIX: Import Job, JobType, and Mentor types
import { DonationCampaign, AlumniProfile, Event, RSVPStatus, FeedItem, Notification, Job, JobType, Mentor } from './types.ts';

export const DONATION_CAMPAIGNS: DonationCampaign[] = [
  { id: 1, title: 'Campus Infrastructure', description: 'Help us build state-of-the-art facilities for future generations.', goal: 100000, raised: 75000, donors: 120, image: 'https://picsum.photos/seed/infra/600/400' },
  { id: 2, title: 'Student Scholarships', description: 'Support bright minds by funding scholarships for deserving students.', goal: 50000, raised: 45000, donors: 250, image: 'https://picsum.photos/seed/scholar/600/400' },
  { id: 3, title: 'Sports Development', description: 'Enhance our sports programs with better equipment and coaching.', goal: 30000, raised: 12000, donors: 80, image: 'https://picsum.photos/seed/sports/600/400' },
  { id: 4, title: 'Innovation Labs', description: 'Equip our labs with the latest technology for cutting-edge research.', goal: 75000, raised: 30000, donors: 65, image: 'https://picsum.photos/seed/labs/600/400' },
  { id: 5, title: 'Arts & Culture Fund', description: 'Nurture creativity and cultural activities on campus.', goal: 25000, raised: 24000, donors: 150, image: 'https://picsum.photos/seed/arts/600/400' },
  { id: 6, title: 'Community Outreach', description: 'Fund programs that connect our students with the local community.', goal: 20000, raised: 5000, donors: 40, image: 'https://picsum.photos/seed/community/600/400' },
];

export const ALUMNI_PROFILES: AlumniProfile[] = [
  { id: 1, name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya', company: 'Google', batch: '2012', department: 'Computer Science', location: 'Mountain View, CA', connected: false },
  { id: 2, name: 'Rohan Verma', avatar: 'https://i.pravatar.cc/150?u=rohan', company: 'Tesla', batch: '2014', department: 'Mechanical Eng.', location: 'Austin, TX', connected: true },
  { id: 3, name: 'Anjali Mehta', avatar: 'https://i.pravatar.cc/150?u=anjali', company: 'Intel', batch: '2010', department: 'Electronics', location: 'Santa Clara, CA', connected: false },
  { id: 4, name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram', company: 'Amazon', batch: '2015', department: 'Information Tech.', location: 'Seattle, WA', connected: false },
  { id: 5, name: 'Sunita Patil', avatar: 'https://i.pravatar.cc/150?u=sunita', company: 'L&T', batch: '2008', department: 'Civil Eng.', location: 'Mumbai, India', connected: true },
  { id: 6, name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?u=amit', company: 'Microsoft', batch: '2013', department: 'Computer Science', location: 'Redmond, WA', connected: false },
];

export const EVENTS: Event[] = [
  { id: 1, title: 'Annual Alumni Reunion', date: new Date(2024, 10, 15, 18, 0), location: 'Main Auditorium', description: 'Join us for the biggest event of the year! Reconnect with old friends, network with fellow alumni, and celebrate our shared history.', type: 'Reunion', rsvp: RSVPStatus.Going },
  { id: 2, title: 'AI/ML Workshop', date: new Date(2024, 9, 22, 10, 0), location: 'CS Department, Lab 3', description: 'A hands-on workshop on the latest trends in Artificial Intelligence and Machine Learning, led by industry experts.', type: 'Workshop' },
  { id: 3, title: 'Startup Pitch Night', date: new Date(2024, 9, 28, 17, 0), location: 'Innovation Hub', description: 'Watch our brightest student and alumni entrepreneurs pitch their startup ideas to a panel of venture capitalists.', type: 'Networking' },
  { id: 4, title: 'Career Path Seminar: Tech', date: new Date(2024, 10, 5, 14, 0), location: 'Virtual Event', description: 'A panel discussion with alumni from top tech companies about navigating a career in the technology industry.', type: 'Seminar' },
];

export const FEED_ITEMS: FeedItem[] = [
  { id: 1, authorId: 1, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), content: 'Excited to share that my team at Google launched a new feature for Google Maps today! It\'s been a long journey, but so rewarding. #Google #AlumniSuccess', image: 'https://picsum.photos/seed/feed1/600/400', likes: 125, comments: 12 },
  { id: 2, authorId: 2, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), content: 'Just wrapped up a guest lecture on EV battery technology at our alma mater. It was great to be back on campus and connect with the students!', likes: 230, comments: 25 },
  { id: 3, authorId: 5, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), content: 'Our new bridge project in Mumbai is officially complete. A huge milestone for the team at L&T. Feeling proud to contribute to the city\'s infrastructure.', image: 'https://picsum.photos/seed/feed2/600/400', likes: 450, comments: 45 },
  { id: 4, authorId: 4, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), content: 'Looking for a talented product manager to join my team at Amazon. If you\'re passionate about e-commerce and innovation, feel free to reach out! #Hiring #Jobs', likes: 98, comments: 8 },
];

export const NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'connection', message: 'Rohan Verma accepted your connection request.', timestamp: new Date(Date.now() - 30 * 60 * 1000), read: false },
    { id: 2, type: 'like', message: 'Priya Sharma liked your post: "Excited to share that my team..."', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: false },
    { id: 3, type: 'comment', message: 'Vikram Singh commented on your post: "Great insight!"', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), read: true },
    { id: 4, type: 'event', message: 'Reminder: "Annual Alumni Reunion" is starting in 24 hours.', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), read: false },
    { id: 5, type: 'comment', message: 'Sunita Patil replied to your comment.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), read: true },
    { id: 6, type: 'connection', message: 'Anjali Mehta wants to connect with you.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), read: true },
];

// FIX: Add JOBS_LISTINGS constant for Jobs page
export const JOBS_LISTINGS: Job[] = [
  { id: 1, title: 'Software Engineer', company: 'Google', logo: 'https://logo.clearbit.com/google.com', description: 'Developing next-generation technologies that change how billions of users connect, explore, and interact with information and one another.', type: JobType.FullTime, postedBy: 'Priya Sharma' },
  { id: 2, title: 'Mechanical Engineer Intern', company: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com', description: 'Join the team building a sustainable energy future. Work on exciting projects related to electric vehicles and energy storage.', type: JobType.Internship, postedBy: 'Rohan Verma' },
  { id: 3, title: 'Product Manager', company: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', description: 'Define and launch new products and features for Amazon\'s e-commerce platform. Drive product strategy and execution.', type: JobType.FullTime, postedBy: 'Vikram Singh' },
  { id: 4, title: 'Data Science Intern', company: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com', description: 'Analyze large datasets to extract meaningful insights and build predictive models that impact millions of users.', type: JobType.Internship, postedBy: 'Amit Kumar' },
];

// FIX: Add MENTORS constant for Mentorship page
export const MENTORS: Mentor[] = [
    { id: 1, name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya', title: 'Senior Software Engineer', company: 'Google', bio: 'Passionate about building scalable systems and mentoring junior engineers. Expertise in cloud computing and distributed systems.', expertise: ['Cloud Computing', 'System Design', 'Go', 'Kubernetes'] },
    { id: 2, name: 'Rohan Verma', avatar: 'https://i.pravatar.cc/150?u=rohan', title: 'Lead Mechanical Engineer', company: 'Tesla', bio: 'Specializing in EV powertrain design and manufacturing. Excited to help students navigate the automotive industry.', expertise: ['CAD/CAM', 'EV Technology', 'Thermodynamics', 'Manufacturing'] },
    { id:3, name: 'Anjali Mehta', avatar: 'https://i.pravatar.cc/150?u=anjali', title: 'Hardware Engineer', company: 'Intel', bio: 'Experienced in semiconductor design and verification. I can guide you on VLSI design and career paths in the hardware industry.', expertise: ['VLSI', 'Verilog', 'Semiconductors', 'Chip Design'] },
    { id: 4, name: 'Sunita Patil', avatar: 'https://i.pravatar.cc/150?u=sunita', title: 'Project Manager', company: 'L&T', bio: 'Managing large-scale infrastructure projects. My skills lie in project planning, execution, and team leadership.', expertise: ['Project Management', 'Civil Engineering', 'Construction', 'Leadership'] },
];