// Generate Indian student names
const indianFirstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Arnav', 'Ayaan', 'Krishna', 'Ishaan',
  'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Reyansh', 'Muhammad', 'Siddharth', 'Samar', 'Vedant', 'Kabir',
  'Aadhya', 'Ananya', 'Pari', 'Anika', 'Navya', 'Angel', 'Diya', 'Myra', 'Sara', 'Prisha',
  'Anvi', 'Aaradhya', 'Kavya', 'Pihu', 'Riya', 'Avni', 'Shanaya', 'Saanvi', 'Kiara', 'Ira',
  'Rohan', 'Aryan', 'Ayush', 'Karan', 'Dhruv', 'Harsh', 'Yash', 'Varun', 'Rahul', 'Nikhil',
  'Priya', 'Sneha', 'Pooja', 'Neha', 'Anjali', 'Divya', 'Shreya', 'Kritika', 'Tanvi', 'Simran',
  'Rajesh', 'Suresh', 'Ramesh', 'Mahesh', 'Ganesh', 'Dinesh', 'Rakesh', 'Naresh', 'Hitesh', 'Ritesh',
  'Lakshmi', 'Durga', 'Saraswati', 'Parvati', 'Radha', 'Sita', 'Gita', 'Meera', 'Kamala', 'Padma'
];

const indianLastNames = [
  'Kumar', 'Singh', 'Sharma', 'Reddy', 'Patel', 'Gupta', 'Rao', 'Nair', 'Iyer', 'Menon',
  'Verma', 'Joshi', 'Agarwal', 'Chopra', 'Malhotra', 'Kapoor', 'Mehta', 'Shah', 'Desai', 'Kulkarni',
  'Pillai', 'Naidu', 'Chowdhury', 'Das', 'Bose', 'Mukherjee', 'Banerjee', 'Chatterjee', 'Ghosh', 'Sen',
  'Pandey', 'Mishra', 'Tiwari', 'Dubey', 'Shukla', 'Srivastava', 'Saxena', 'Jain', 'Agrawal', 'Goyal'
];

// 5 Departments with 4 years each
const departments = [
  'Computer Science',
  'Mechanical Engineering', 
  'Electrical Engineering',
  'Civil Engineering',
  'Electronics and Communication'
];

// Course names by department, year, and semester (odd/even)
// All students in same department/year/semester have SAME 8 courses
const departmentCourses = {
  'Computer Science': {
    'Year 1 - Odd Semester': ['Programming Fundamentals', 'Digital Logic', 'Mathematics-I', 'Physics', 'English Communication', 'Engineering Drawing', 'Computer Organization', 'IT Workshop'],
    'Year 1 - Even Semester': ['Data Structures', 'Discrete Mathematics', 'Mathematics-II', 'Chemistry', 'Environmental Science', 'Web Technologies', 'Problem Solving', 'Technical Writing'],
    'Year 2 - Odd Semester': ['Frontend Development', 'Computer Networks', 'Mathematical Optimization', 'Artificial Intelligence', 'Machine Learning', 'Database Management System', 'Object Oriented Programming', 'Data Visualization and Analytics'],
    'Year 2 - Even Semester': ['Backend Development', 'Network Security', 'Operating Systems', 'Software Engineering', 'Cloud Computing', 'Advanced DBMS', 'Python Programming', 'Sports'],
    'Year 3 - Odd Semester': ['Mobile App Development', 'Compiler Design', 'Computer Graphics', 'Machine Learning Advanced', 'Big Data Analytics', 'Cyber Security', 'Blockchain', 'IoT Systems'],
    'Year 3 - Even Semester': ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Distributed Systems', 'Microservices', 'DevOps', 'Agile Methods', 'Entrepreneurship'],
    'Year 4 - Odd Semester': ['Advanced AI', 'Quantum Computing', 'Edge Computing', 'AR/VR Technologies', 'Ethical Hacking', 'Data Science', 'Research Methodology', 'Industry Project-I'],
    'Year 4 - Even Semester': ['Capstone Project', 'System Design', 'Software Testing', 'Project Management', 'Industry Internship', 'Seminar', 'Placement Training', 'Industry Project-II']
  },
  'Mechanical Engineering': {
    1: ['Engineering Mechanics', 'Engineering Drawing', 'Manufacturing Processes', 'Material Science', 'Thermodynamics-I', 'Workshop Practice', 'Engineering Mathematics', 'Basic Electrical'],
    2: ['Fluid Mechanics', 'Strength of Materials', 'Thermodynamics-II', 'Kinematics of Machines', 'Manufacturing Technology', 'Heat Transfer', 'Engineering Materials', 'Metrology'],
    3: ['Machine Design', 'Dynamics of Machines', 'Thermal Engineering', 'Automobile Engineering', 'CAD/CAM', 'Industrial Engineering', 'Refrigeration', 'Mechatronics'],
    4: ['Finite Element Analysis', 'Robotics', 'Advanced Manufacturing', 'Power Plant Engineering', 'Renewable Energy', 'Vibration Analysis', 'Project Work', 'Industrial Management']
  },
  'Electrical Engineering': {
    1: ['Circuit Theory', 'Electrical Machines-I', 'Network Analysis', 'Electromagnetic Theory', 'Electrical Measurements', 'Basic Electronics', 'Engineering Mathematics', 'Workshop'],
    2: ['Electrical Machines-II', 'Power Systems-I', 'Control Systems', 'Analog Electronics', 'Digital Electronics', 'Signals and Systems', 'Microprocessors', 'Electrical Design'],
    3: ['Power Systems-II', 'Power Electronics', 'Electric Drives', 'Microcontrollers', 'VLSI Design', 'Embedded Systems', 'Renewable Energy Systems', 'High Voltage Engineering'],
    4: ['Smart Grid Technology', 'Industrial Automation', 'Power System Protection', 'Electric Vehicles', 'Energy Management', 'Advanced Control Systems', 'Project Work', 'Power Quality']
  },
  'Civil Engineering': {
    1: ['Engineering Mechanics', 'Building Materials', 'Surveying-I', 'Engineering Drawing', 'Environmental Studies', 'Basic Electrical', 'Engineering Mathematics', 'Workshop Practice'],
    2: ['Strength of Materials', 'Fluid Mechanics', 'Surveying-II', 'Concrete Technology', 'Structural Analysis-I', 'Geotechnical Engineering', 'Highway Engineering', 'Construction Materials'],
    3: ['Structural Analysis-II', 'Design of Structures', 'Foundation Engineering', 'Water Resources Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Estimation', 'Construction Management'],
    4: ['Advanced Structural Design', 'Earthquake Engineering', 'Bridge Engineering', 'Urban Planning', 'GIS Applications', 'Project Management', 'Sustainable Construction', 'Major Project']
  },
  'Electronics and Communication': {
    1: ['Circuit Theory', 'Electronic Devices', 'Network Analysis', 'Digital Logic', 'Signals and Systems', 'Engineering Mathematics', 'C Programming', 'Communication Skills'],
    2: ['Analog Electronics', 'Digital Electronics', 'Electromagnetic Theory', 'Microprocessors', 'Electronic Circuits', 'Control Systems', 'Data Structures', 'Probability Theory'],
    3: ['Communication Systems', 'VLSI Design', 'Microcontrollers', 'Digital Signal Processing', 'Embedded Systems', 'Antenna Theory', 'Optical Communication', 'Computer Networks'],
    4: ['Wireless Communication', 'Mobile Computing', 'Satellite Communication', 'IoT Systems', 'Image Processing', 'Advanced DSP', 'RF Engineering', 'Final Year Project']
  }
};

// Generate students: 5 depts × 4 years × 2 semesters × 200 students = 8000 students
// All students in same dept/year/semester have SAME 8 courses
const generateStudents = () => {
  const students = [];
  let studentId = 1;
  
  departments.forEach((dept) => {
    const deptCode = dept.substring(0, 2).toUpperCase();
    
    // 4 years per department
    for (let year = 1; year <= 4; year++) {
      // 2 semesters per year (odd and even)
      for (let semType = 0; semType < 2; semType++) {
        const isOddSem = semType === 0;
        const semester = year * 2 - (isOddSem ? 1 : 0); // Odd: 1,3,5,7 Even: 2,4,6,8
        
        // 200 students per semester
        for (let studentNum = 0; studentNum < 200; studentNum++) {
          const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
          const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
          const name = `${firstName} ${lastName}`;
          const rollNo = `${deptCode}${year}${semester}${String(studentNum + 1).padStart(3, '0')}`;
          
          students.push({
            id: String(studentId),
            name,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${studentId}@student.edu`,
            department: dept,
            year,
            semester,
            rollNo,
            performance: Math.floor(Math.random() * 30) + 70, // 70-100
            attendance: Math.floor(Math.random() * 20) + 80, // 80-100
            assignedCourses: []
          });
          studentId++;
        }
      }
    }
  });
  
  return students;
};

export const studentsData = generateStudents();

// Generate teachers: 5 depts × 4 years × 2 semesters × 8 courses = 320 teachers (1 per course)
const generateTeachers = () => {
  const teachers = [];
  let teacherId = 10001;
  
  const teacherTitles = ['Dr.', 'Prof.'];
  
  departments.forEach((dept) => {
    for (let year = 1; year <= 4; year++) {
      for (let semType = 0; semType < 2; semType++) {
        for (let courseIdx = 0; courseIdx < 8; courseIdx++) {
          const title = teacherTitles[teacherId % 2]; // Alternate between Dr. and Prof.
          const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
          const name = `${title} ${lastName}`;
          
          teachers.push({
            id: String(teacherId),
            name,
            role: 'teacher',
            email: `${lastName.toLowerCase()}${teacherId}@faculty.edu`,
            department: dept,
            assignedCourse: String(teacherId - 10000) // Course ID
          });
          teacherId++;
        }
      }
    }
  });
  
  return teachers;
};

export const users = [
  // Generate users from studentsData
  ...studentsData.map(s => ({
    id: s.id,
    name: s.name,
    role: 'student',
    email: s.email,
    department: s.department,
    year: s.year,
    semester: s.semester
  })),
  
  // Teachers - 320 teachers total (1 per course)
  ...generateTeachers(),
  
  // Admin
  { id: '20001', name: 'Dr. Krishna Reddy', role: 'admin', email: 'krishna@admin.edu' }
];

// Generate courses: 5 depts × 4 years × 2 semesters × 8 courses = 320 courses
// All students in same dept/year/semester are enrolled in ALL 8 courses
const generateCourses = () => {
  const courses = [];
  let courseId = 1;
  let teacherId = 10001;
  
  departments.forEach((dept) => {
    const deptCode = dept.substring(0, 2).toUpperCase();
    const deptCoursesData = departmentCourses[dept];
    
    for (let year = 1; year <= 4; year++) {
      for (let semType = 0; semType < 2; semType++) {
        const isOddSem = semType === 0;
        const semester = year * 2 - (isOddSem ? 1 : 0);
        const semKey = `Year ${year} - ${isOddSem ? 'Odd' : 'Even'} Semester`;
        
        // Get courses for this semester (only CS has semester-based courses)
        let semesterCourses;
        if (dept === 'Computer Science') {
          semesterCourses = deptCoursesData[semKey] || [];
        } else {
          // For other depts, use year-based courses
          semesterCourses = deptCoursesData[year] || [];
        }
        
        // Get all students in this dept/year/semester (200 students)
        const semStudents = studentsData.filter(s => 
          s.department === dept && s.year === year && s.semester === semester
        );
        const allStudentIds = semStudents.map(s => s.id);
        
        semesterCourses.forEach((courseName, idx) => {
          const teacher = users.find(u => u.id === String(teacherId));
          
          courses.push({
            id: String(courseId),
            name: courseName,
            code: `${deptCode}${year}${isOddSem ? 'O' : 'E'}${String(idx + 1).padStart(2, '0')}`,
            teachers: teacher ? [teacher.name] : [],
            teacherIds: [String(teacherId)],
            students: allStudentIds, // ALL 200 students enrolled in each course
            semester: isOddSem ? 'Odd' : 'Even',
            year: 2025,
            department: dept
          });
          
          courseId++;
          teacherId++;
        });
      }
    }
  });
  
  return courses;
};

export const courses = generateCourses();

export const feedbackForms = [
  {
    id: '1',
    courseId: '1',
    title: 'Mid-Semester Feedback',
    isActive: true,
    deadline: '2025-02-15',
    questions: [
      { id: '1', type: 'rating', question: 'How would you rate the course content?', required: true },
      { id: '2', type: 'rating', question: 'How would you rate the instructor\'s teaching?', required: true },
      { id: '3', type: 'slider', question: 'Course difficulty level (1-10)', required: true },
      { id: '4', type: 'text', question: 'What could be improved in this course?', required: false }
    ]
  }
];

export const analytics = [
  { courseId: '1', averageRating: 4.2, totalResponses: 45, responseRate: 87, ratings: { 5: 20, 4: 15, 3: 8, 2: 2, 1: 0 } },
  { courseId: '2', averageRating: 4.5, totalResponses: 38, responseRate: 92, ratings: { 5: 22, 4: 12, 3: 3, 2: 1, 1: 0 } },
  { courseId: '3', averageRating: 3.8, totalResponses: 42, responseRate: 78, ratings: { 5: 15, 4: 18, 3: 7, 2: 2, 1: 0 } }
];
