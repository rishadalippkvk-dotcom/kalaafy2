// Programs Data
export const programs = {
    offstage: [
        {
            id: 1,
            name: 'Quiz Competition',
            category: 'offstage',
            description: 'Test your knowledge across various topics',
            date: '2024-01-15',
            time: '10:00 AM',
            venue: 'Seminar Hall A',
            participants: 'Individual',
            icon: '🧠'
        },
        {
            id: 2,
            name: 'Debate',
            category: 'offstage',
            description: 'Showcase your argumentative skills',
            date: '2024-01-15',
            time: '2:00 PM',
            venue: 'Auditorium',
            participants: 'Group (2-3)',
            icon: '🎤'
        },
        {
            id: 3,
            name: 'Essay Writing',
            category: 'offstage',
            description: 'Express your thoughts through words',
            date: '2024-01-16',
            time: '9:00 AM',
            venue: 'Library Hall',
            participants: 'Individual',
            icon: '✍️'
        },
        {
            id: 4,
            name: 'Photography',
            category: 'offstage',
            description: 'Capture moments through your lens',
            date: '2024-01-16',
            time: '11:00 AM',
            venue: 'Campus Grounds',
            participants: 'Individual',
            icon: '📷'
        },
        {
            id: 5,
            name: 'Short Film',
            category: 'offstage',
            description: 'Create compelling visual stories',
            date: '2024-01-17',
            time: '3:00 PM',
            venue: 'Media Lab',
            participants: 'Group (4-6)',
            icon: '🎬'
        }
    ],
    onstage: [
        {
            id: 6,
            name: 'Classical Dance',
            category: 'onstage',
            description: 'Traditional dance performances',
            date: '2024-01-18',
            time: '5:00 PM',
            venue: 'Main Stage',
            participants: 'Individual/Group',
            icon: '💃'
        },
        {
            id: 7,
            name: 'Western Dance',
            category: 'onstage',
            description: 'Contemporary dance performances',
            date: '2024-01-18',
            time: '6:30 PM',
            venue: 'Main Stage',
            participants: 'Group (6-10)',
            icon: '🕺'
        },
        {
            id: 8,
            name: 'Solo Singing',
            category: 'onstage',
            description: 'Showcase your vocal talents',
            date: '2024-01-19',
            time: '4:00 PM',
            venue: 'Main Stage',
            participants: 'Individual',
            icon: '🎵'
        },
        {
            id: 9,
            name: 'Group Singing',
            category: 'onstage',
            description: 'Harmonize with your team',
            date: '2024-01-19',
            time: '7:00 PM',
            venue: 'Main Stage',
            participants: 'Group (4-8)',
            icon: '🎶'
        },
        {
            id: 10,
            name: 'Drama',
            category: 'onstage',
            description: 'Theatrical performances',
            date: '2024-01-20',
            time: '5:00 PM',
            venue: 'Main Stage',
            participants: 'Group (8-15)',
            icon: '🎭'
        },
        {
            id: 11,
            name: 'Stand-up Comedy',
            category: 'onstage',
            description: 'Make the audience laugh',
            date: '2024-01-20',
            time: '8:00 PM',
            venue: 'Main Stage',
            participants: 'Individual',
            icon: '😂'
        }
    ]
};

// Individual Scores
export const individualScores = [
    { rank: 1, name: 'Priya Sharma', college: 'ASTRA', program: 'Solo Singing', category: 'onstage', score: 98, medal: '🥇' },
    { rank: 2, name: 'Rahul Verma', college: 'LOKHA', program: 'Stand-up Comedy', category: 'onstage', score: 96, medal: '🥈' },
    { rank: 3, name: 'Ananya Iyer', college: 'EAKHA', program: 'Classical Dance', category: 'onstage', score: 95, medal: '🥉' },
    { rank: 4, name: 'Arjun Menon', college: 'ASTRA', program: 'Quiz Competition', category: 'offstage', score: 94 },
    { rank: 5, name: 'Sneha Reddy', college: 'LOKHA', program: 'Essay Writing', category: 'offstage', score: 93 },
    { rank: 6, name: 'Vikram Singh', college: 'ASTRA', program: 'Photography', category: 'offstage', score: 92 },
    { rank: 7, name: 'Divya Nair', college: 'LOKHA', program: 'Classical Dance', category: 'onstage', score: 91 },
    { rank: 8, name: 'Karthik Kumar', college: 'EAKHA', program: 'Solo Singing', category: 'onstage', score: 90 },
    { rank: 9, name: 'Meera Patel', college: 'EAKHA', program: 'Debate', category: 'offstage', score: 89 },
    { rank: 10, name: 'Rohan Das', college: 'ASTRA', program: 'Stand-up Comedy', category: 'onstage', score: 88 }
];

// Group Scores
export const groupScores = [
    { rank: 1, teamName: 'Rhythm Riders', college: 'ASTRA', program: 'Western Dance', category: 'onstage', score: 97, members: 8, medal: '🥇' },
    { rank: 2, teamName: 'Drama Kings', college: 'LOKHA', program: 'Drama', category: 'onstage', score: 96, members: 12, medal: '🥈' },
    { rank: 3, teamName: 'Melody Makers', college: 'EAKHA', program: 'Group Singing', category: 'onstage', score: 95, members: 6, medal: '🥉' },
    { rank: 4, teamName: 'Cine Squad', college: 'ASTRA', program: 'Short Film', category: 'offstage', score: 94, members: 5 },
    { rank: 5, teamName: 'Debate Masters', college: 'LOKHA', program: 'Debate', category: 'offstage', score: 92, members: 3 },
    { rank: 6, teamName: 'Classical Ensemble', college: 'ASTRA', program: 'Classical Dance', category: 'onstage', score: 91, members: 7 },
    { rank: 7, teamName: 'Harmony Voices', college: 'LOKHA', program: 'Group Singing', category: 'onstage', score: 90, members: 6 },
    { rank: 8, teamName: 'Film Makers', college: 'EAKHA', program: 'Short Film', category: 'offstage', score: 89, members: 5 },
    { rank: 9, teamName: 'Dance Fusion', college: 'EAKHA', program: 'Western Dance', category: 'onstage', score: 88, members: 8 },
    { rank: 10, teamName: 'Stage Warriors', college: 'ASTRA', program: 'Drama', category: 'onstage', score: 87, members: 10 }
];

// Notices
export const notices = [
    {
        id: 1,
        title: 'Registration Deadline Extended',
        content: 'The registration deadline for all events has been extended to January 10th, 2024. Don\'t miss this opportunity!',
        date: '2024-01-05',
        time: '10:00 AM',
        priority: 'important',
        category: 'Registration'
    },
    {
        id: 2,
        title: 'Venue Change: Quiz Competition',
        content: 'The Quiz Competition venue has been changed from Seminar Hall B to Seminar Hall A due to technical requirements.',
        date: '2024-01-08',
        time: '3:30 PM',
        priority: 'urgent',
        category: 'Venue Update'
    },
    {
        id: 3,
        title: 'Winners Announcement Ceremony',
        content: 'The grand finale and winners announcement ceremony will be held on January 21st at 6:00 PM in the Main Auditorium.',
        date: '2024-01-10',
        time: '11:00 AM',
        priority: 'new',
        category: 'Event'
    },
    {
        id: 4,
        title: 'Participant ID Cards Ready',
        content: 'All registered participants can collect their ID cards from the registration desk between 9:00 AM to 5:00 PM.',
        date: '2024-01-12',
        time: '9:00 AM',
        priority: 'info',
        category: 'Information'
    },
    {
        id: 5,
        title: 'Food Stalls and Refreshments',
        content: 'Multiple food stalls will be available throughout the festival. Special discount coupons for participants!',
        date: '2024-01-14',
        time: '2:00 PM',
        priority: 'info',
        category: 'Facilities'
    },
    {
        id: 6,
        title: 'Photography Contest Submissions',
        content: 'Submit your photography entries online by January 15th. Theme: "Campus Life". Maximum 3 entries per participant.',
        date: '2024-01-13',
        time: '4:00 PM',
        priority: 'important',
        category: 'Submission'
    }
];

// Gallery Images
export const galleryImages = [
    {
        id: 1,
        url: '/gallery/dance1.jpg',
        title: 'Classical Dance Performance',
        category: 'onstage',
        event: 'Classical Dance',
        description: 'Beautiful classical dance performance'
    },
    {
        id: 2,
        url: '/gallery/singing1.jpg',
        title: 'Solo Singing Champion',
        category: 'onstage',
        event: 'Solo Singing',
        description: 'Winner of solo singing competition'
    },
    {
        id: 3,
        url: '/gallery/drama1.jpg',
        title: 'Drama Performance',
        category: 'onstage',
        event: 'Drama',
        description: 'Intense drama performance'
    },
    {
        id: 4,
        url: '/gallery/debate1.jpg',
        title: 'Debate Competition',
        category: 'offstage',
        event: 'Debate',
        description: 'Heated debate session'
    },
    {
        id: 5,
        url: '/gallery/quiz1.jpg',
        title: 'Quiz Competition',
        category: 'offstage',
        event: 'Quiz',
        description: 'Intense quiz rounds'
    },
    {
        id: 6,
        url: '/gallery/western1.jpg',
        title: 'Western Dance Group',
        category: 'onstage',
        event: 'Western Dance',
        description: 'Energetic western dance performance'
    },
    {
        id: 7,
        url: '/gallery/comedy1.jpg',
        title: 'Stand-up Comedy',
        category: 'onstage',
        event: 'Comedy',
        description: 'Hilarious comedy performance'
    },
    {
        id: 8,
        url: '/gallery/photo1.jpg',
        title: 'Photography Exhibition',
        category: 'offstage',
        event: 'Photography',
        description: 'Award-winning photographs'
    }
];
