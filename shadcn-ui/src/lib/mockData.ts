import { UserProfile } from '@/types';

export const generateMockProfiles = (): UserProfile[] => {
  return [
    {
      id: '1',
      userId: 'mock-user-1',
      firstName: 'Adebayo',
      lastName: 'Johnson',
      email: 'adebayo.johnson@email.com',
      phone: '+234 801 234 5678',
      education: 'Bachelor of Science in Computer Science, University of Lagos',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis', 'Project Management'],
      experience: 'Software Developer Intern at TechCorp Nigeria for 6 months. Built web applications using React and Node.js. Led a team of 3 interns on a customer management system project.',
      bio: 'Passionate software developer with a strong foundation in web technologies. I love solving complex problems and building applications that make a difference. My goal is to contribute to Nigeria\'s tech ecosystem and help bridge the digital divide.',
      updatedAt: '2025-01-15T10:00:00Z'
    },
    {
      id: '2',
      userId: 'mock-user-2',
      firstName: 'Fatima',
      lastName: 'Abdullahi',
      email: 'fatima.abdullahi@email.com',
      phone: '+234 802 345 6789',
      education: 'Bachelor of Engineering in Electrical Engineering, Ahmadu Bello University',
      skills: ['Python', 'Machine Learning', 'Data Science', 'SQL', 'Power BI', 'Arduino'],
      experience: 'Data Analyst at Nigerian National Petroleum Corporation. Analyzed production data and created dashboards for management decision-making. Completed Google Data Analytics Certificate.',
      bio: 'Data enthusiast with a background in electrical engineering. I\'m passionate about using data to drive insights and improve processes. I want to transition into tech and contribute to data-driven solutions in Nigeria.',
      updatedAt: '2025-01-14T15:30:00Z'
    },
    {
      id: '3',
      userId: 'mock-user-3',
      firstName: 'Chinedu',
      lastName: 'Okafor',
      email: 'chinedu.okafor@email.com',
      phone: '+234 803 456 7890',
      education: 'Bachelor of Arts in Economics, University of Nigeria, Nsukka',
      skills: ['Excel', 'Financial Analysis', 'Business Intelligence', 'Communication', 'Leadership'],
      experience: 'Financial Analyst at First Bank Nigeria. Prepared financial reports and conducted market analysis. Led training sessions for junior analysts.',
      bio: 'Economics graduate with strong analytical skills looking to transition into the tech industry. I believe technology can transform Nigeria\'s financial sector and I want to be part of that change.',
      updatedAt: '2025-01-13T09:15:00Z'
    },
    {
      id: '4',
      userId: 'mock-user-4',
      firstName: 'Kemi',
      lastName: 'Adeyemi',
      email: 'kemi.adeyemi@email.com',
      phone: '+234 804 567 8901',
      education: 'Bachelor of Science in Mathematics, Obafemi Awolowo University',
      skills: ['Python', 'R', 'Statistics', 'Machine Learning', 'Tableau', 'Research'],
      experience: 'Research Assistant at university statistics department. Conducted statistical analysis for various research projects. Freelance data analyst for small businesses.',
      bio: 'Mathematics graduate passionate about statistics and data science. I enjoy uncovering insights from data and want to use my skills to solve real-world problems in Nigeria.',
      updatedAt: '2025-01-12T14:20:00Z'
    },
    {
      id: '5',
      userId: 'mock-user-5',
      firstName: 'Ibrahim',
      lastName: 'Musa',
      email: 'ibrahim.musa@email.com',
      phone: '+234 805 678 9012',
      education: 'Higher National Diploma in Computer Science, Federal Polytechnic Kaduna',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress'],
      experience: 'Web Developer at local digital agency. Built websites for small businesses and NGOs. Self-taught in modern web technologies through online courses.',
      bio: 'Self-motivated web developer with a passion for creating user-friendly websites. I want to upgrade my skills and work on larger projects that can impact more people.',
      updatedAt: '2025-01-11T11:45:00Z'
    }
  ];
};

// Initialize mock data in localStorage if not exists
export const initializeMockData = () => {
  const existingProfiles = localStorage.getItem('profiles');
  if (!existingProfiles) {
    const mockProfiles = generateMockProfiles();
    localStorage.setItem('profiles', JSON.stringify(mockProfiles));
  }

  // Initialize demo users
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 'admin-1',
        email: 'admin@plp.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        profileComplete: true,
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 'student-1',
        email: 'student@plp.com',
        password: 'student123',
        name: 'Student User',
        role: 'student',
        profileComplete: false,
        createdAt: '2025-01-01T00:00:00Z'
      }
    ];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};
