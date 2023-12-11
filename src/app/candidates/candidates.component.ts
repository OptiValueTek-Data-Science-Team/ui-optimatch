import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatransferService } from '../Services/datatransfer.service'
import { HttpParams } from '@angular/common/http';
// import {} from '../pie-chart/pie-chart.component'
interface UserProfile {
  // role: string;
  Name: string;
  // recommendation: string;
  Skills: string;
  // resume: string; 
  Contact: string;
  Email: string;
  // Skills2:string;
  Education: string;
  // Experience:string
  // job_description:string;
  // pieChartData?: any[];
  // This could be a URL or actual content
  matching_score:number;
}
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})

export class CandidatesComponent implements OnInit {
  odometerCounterValue = 0;
  pieChartData: any[] = [
    ['Task', 'Hours'],
    ['Angularjs', 2],
    ['sql', 8],
    ['Code', 12],
    ['Commute', 3],
    ['Python', 8],
    ['Java', 9], ['Angular', 9]

  ];
  searchQuery: string = '';
  CvSearchForm: FormGroup;
  filteredUserProfiles: UserProfile[] = [];
  public canvasWidth
  public needleValue
  public centralLabel
  public label
  public options
  url: string = 'http://127.0.0.1:5000/get_job_description'

  // userProfiles: UserProfile[] = [
  //   {

  //     pieChartData: [
  //       ['Task', 'Hours'],
  //       ['Angularjs', 2],
  //       ['SQL', 8],
  //       ['Code', 12],
  //       ['Commute', 3],
  //       ['Python', 8],
  //       ['Java', 9],
  //       ['Angular', 9],
  //     ],
  //     job_description:'python',
  //     role: 'Senior Developer',
  //     Experience:'5 years',
  //     name: 'John Doe',
  //     recommendation: 'Recommended',
  //     skills: ['HTML', 'CSS', 'JavaScript', 'Python'],
  //     Contact: "+91 9891658952",
  //     Email: "vipulkumarsharma06@gmail.com",
  //     Education: "MBA IT (2008-11) (Part-Time), B.Tech (2005) (Guru Jambheshwar University-Hissar), Senior Secondary (2001) (A.I.S.S.C.E. KMSSS-Bulandshahr), Matriculation (1999) (A.I.S.S.E. Nirmala Convent School-Bulandshahr)",
  //     Skills2: ".NET Core, ASP.NET, C#, ASP.NET 2.0, 3.0, 3.5, 4.0, 4.5, MVC4, WCF, Web API, Angular JS, SQL Server 2008/2012, OOPS concepts, LINQ, XML, jQuery, Windows Services, Unit Test",
  //     resume:'Create professional Resume / CV with expert content that can be customized just for you. Make a perfect resume in 2021 and get your dream job using the free resume builder. CV. Resume. Resume Website. Cover letter. Services: CV, Resume, Cover letter.'
  //   },
  //   {
  //     pieChartData: [
  //       ['Task', 'Hours'],
  //       ['c++', 2],
  //       ['C', 8],
  //       ['Code', 12],
  //       ['React', 3],
  //       ['Python', 8],
  //       ['Java', 9],
  //       ['Angular', 9],
  //     ],
  //     role: 'Frontend Developer',
  //     job_description:'java',
  //     Experience:'5 years',
  //     // name: 'Jane Smith',
  //     recommendation: 'Highly Skilled',
  //     name: "Sanjay Kumar Ashok Jadav",
  //     Contact: "91-7506097561",
  //     Email: "jadavsanjaykumar69@gmail.com, jadavsanju@yahoo.com,sanjayjadav843@gmail.com",
  //     Education: "MCA in Master of Computer Application from Vapi, Gujarat in 2013-2014 with 60%, Hardware & Networking with 65.5% in year 2008, B.com with 43.55% in year 2007, H.S.C with 43.55% in year 2003, S.S.C with 45.71% in year 2000",
  //     Skills2: "C# 4.0/3.5, Angular13, .NET Core 3.1, ASP.NET 4.0/3.5, Web Service, MVC 5, Web API, LINQ, Entity Framework, Git,C#,ADO.NET,Webfrom, AJAX, XML",
  //     skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  //     resume:'Create professional Resume / CV with expert content that can be customized just for you. Make a perfect resume in 2021 and get your dream job using the free resume builder. CV. Resume. Resume Website. Cover letter. Services: CV, Resume, Cover letter.'

  //   },
  //   {
  //     pieChartData: [
  //       ['Task', 'Hours'],
  //       ['.net', 2],
  //       ['Cobol', 8],
  //       ['Code', 12],

  //     ],
  //     role: 'Backend Developer',
  //     job_description:'python',
  //     name: "Nitish Kumar",
  //     Contact: "+919483298064",
  //   Email: "nitishkumar154@gmail.com",
  //     Education: "Gniit from Niit Ranchi (Jharkhand) 2007-2011, MCA (SMU) 2011-2014",
  //     Skills2: "C# .NET, ADO.NET, ASP.NET MVC, MS SQL Server 2000/2005/2008/2012/2014, Visual Studio 2008/2010/2012/2015/2019, jQuery, JS, HTML5, CSS, RDLC, SSRS, .NET, Bootstrap 5, Angular 14", // Job Title: "Software Developer",
  //     Experience: "7.6 years",
  //     // "Projects": " 1) Andromeda (Web Site): Technology/Software: ASP.NET Core, C#, ADO.NET, Visual Studio 2019, MS SQL Server 2012, Role: Full Stack, Client: Paisaudhar, Team Size: 8",
  //     recommendation: 'Experienced',
  //     skills: ['Java', 'Spring Boot', 'SQL'],
  //     resume:'mnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn mmmmmmmmmmmmmmmmmmmmmm, ,,,,,,,,,,,,,,,,m'
  //   },
  //   {
  //     // role: 'UI/UX Designer',
  //     pieChartData: [
  //       ['Task', 'Hours'],
  //       ['Angularjs', 2],
  //       ['SQL', 8],
  //       ['Code', 12],

  //     ],
  //     job_description:'java',
  //     name: "Harish Sharma",
  //    Contact: "+91 6360737809",
  //     Email: "harrygerman2019@gmail.com",
  //     Education: "Master of Computer Application, VTU University, Bangalore, India",
  //     Skills2: "Oracle Apex, Oracle Fusion BIP Reports, Oracle Integration Cloud Service, Database Cloud Service, Oracle Cloud Apex, Oracle 10g/11g/12c, PL/SQL, SQL, DBMS_Scheduler, XML Publisher, Workflow, SQL*Plus, SQL*Loader, TOAD, Winscp, Putty, SOAP, Tortoise SVN, Sun Solaris, Linux, Windows, Java Script, Shell Scripting, HTML, XML, CSS, ORDS, Microsoft Azure, Graph API",
  //      role: "Oracle Apex Solution Architect",
  //     Experience: "12+ years",
  //     // Projects": " - Survey Tool - World Bank Implementation Project (A2F Consulting GmbH - Technical Lead"
  //     recommendation: 'Creative',
  //     skills: ['UI Design', 'Adobe XD', 'Sketch'], 
  //     resume:'Create professional Resume / CV with expert content that can be customized just for you. Make a perfect resume in 2021 and get your dream job using the free resume builder. CV. Resume. Resume Website. Cover letter. Services: CV, Resume, Cover letter.'

  //   },
  //   // {
  //   //   role: 'Full Stack Developer',
  //   //   name: 'Emily Davis',
  //   //   recommendation: 'Versatile',
  //   //   skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
  //   //   resume:'Create professional Resume / CV with expert content that can be customized just for you. Make a perfect resume in 2021 and get your dream job using the free resume builder. CV. Resume. Resume Website. Cover letter. Services: CV, Resume, Cover letter.'

  //   // },
  //   // {
  //   //   role: 'Data Scientist',
  //   //   name: 'Alex Turner',
  //   //   recommendation: 'Analytical',
  //   //   skills: ['Python', 'Machine Learning', 'Data Analysis'], resume:'Create professional Resume / CV with expert content that can be customized just for you. Make a perfect resume in 2021 and get your dream job using the free resume builder. CV. Resume. Resume Website. Cover letter. Services: CV, Resume, Cover letter.'

  //   // },
  //   // {
  //   //   role: 'Mobile App Developer',
  //   //   name: 'Sophia Wilson',
  //   //   recommendation: 'Innovative',
  //   //   skills: ['Flutter', 'Dart', 'Firebase'],
  //   //   resume:'Create professional Resume / CV with expert content that can be customized just for you. Make a perfect resume in 2021 and get your dream job using the free resume builder. CV. Resume. Resume Website. Cover letter. Services: CV, Resume, Cover letter.'

  //   // },
  //   // Add more user profiles as needed
  // ];
  filter: ({ name: string; op: string; val: any; or?: undefined; } | { or: { name: string; op: string; val: string; }[]; name?: undefined; op?: undefined; val?: undefined; })[];
  jobList3: any;
  http: any;
  userProfiles: any;
  matchingScore:number;

  constructor(private modalService: NgbModal, private dataTransferService: DatatransferService) {
    this.canvasWidth = 300
    this.needleValue =0
    this.centralLabel = ''
    this.options = {
    hasNeedle: true,
    needleColor: 'grayblack',
    needleUpdateSpeed: 800,
    arcColors: ['red','red','red', 'yellow','yellow','yellow','yellow','green','green','green'],
    arcDelimiters: [10,20,30,40,50,60,70,80,90],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
    arcLabels:['10','20','30','40','50','60','70','80','90'],
    arcpadding: 5
  }
   }


  ngOnInit(): void {
    this.CvSearchForm = new FormGroup({
      job_description: new FormControl(''),
      location: new FormControl(''),
      experience: new FormControl(''),
    });
    // this.selectedUserProfile = this.userProfiles[0];
    this.getdata()

  }
  getdata() {
    const api = 'http://127.0.0.1:5000/get_all_resume_data';
    this.dataTransferService.get(api).subscribe((data: any) => {
      this.userProfiles = data.result;
      // this.userProfiles.SkillsArray = this.selectedUserProfile.Skills.split(',')
      console.log("data", data.result)
      this.selectedUserProfile = data.result[0]
    });
  }
  selectedUserProfile: UserProfile | null = null;

  //   serch(){
  //     // this.filter = [
  //     //   {
  //     //     name: 'location',
  //     //     op: 'ilike',
  //     //     val: this.CvSearchForm.controls.location.value,
  //     //   },
  //     //   {
  //     //     name: 'experience',
  //     //     op: 'eq',
  //     //     val: this.CvSearchForm.controls.experience.value,
  //     //   },
  //     //   {
  //     //     or: [
  //     //       {
  //     //         name: 'title',
  //     //         op: 'ilike',
  //     //         val: '%' + this.CvSearchForm.controls.search.value + '%',
  //     //       },
  //     //       {
  //     //         name: 'skills',
  //     //         op: 'ilike',
  //     //         val: '%' + this.CvSearchForm.controls.search.value + '%',
  //     //       },

  //     //     ],
  //     //   },
  //     // ];
  //     this.filter = [
  //       {
  //         or: [
  //           {
  //             name: 'name', // Assuming 'name' is the property you want to search
  //             op: 'ilike',
  //             val: '%' + this.CvSearchForm.controls.job_description.value + '%',
  //           },
  //           // Add more properties if needed
  //         ],
  //       },
  //     ];
  //     this.url = this.url + '&filter=' + JSON.stringify(this.filter);
  //     this.dataTransferService.get(this.url).subscribe((data: any) => {
  //       this.jobList3 = data.data;
  //   })
  // }

  // serch() {
  //   const searchTerm = this.CvSearchForm.controls.job_description.value.toLowerCase();

  //   // Local data filtering
  //   this.userProfiles = this.userProfiles.filter(profile => {
  //     const descriptionMatches = profile.job_description.toLowerCase().includes(searchTerm);
  //     // Add more conditions if needed for additional fields

  //     return descriptionMatches;
  //   });
  // }

  getEducationTitle(educationEntry: string): string {
    // Extract the title part (before the first space)
    const title = educationEntry.split(' ')[0];
    return title;
  }

  getEducationDetails(educationEntry: string): string {
    // Extract the details part (after the first space)
    const details = educationEntry.substr(educationEntry.indexOf(' ') + 1).trim();
    return details;
  }
  serch() {
    const job_description = this.CvSearchForm.controls.job_description.value;
    const apiUrl = 'http://127.0.0.1:5000/get_job_description';

    const apiWithParams = apiUrl + '?job_description=' + job_description
    // Use the custom get method from your dataTransferService
    try {
      this.dataTransferService.get(apiWithParams).subscribe((response: any) => {
        console.log(response);
        
        this.userProfiles = response.data;
        this.selectedUserProfile = response.data[0]

        this.matchingScore=response.data[0].matching_score *1000
        this.needleValue=this.matchingScore;              
      });

    } catch (error) {
      console.log(error);

    }

  }

  showResume(userProfile: UserProfile): void {

    if (userProfile.matching_score >=0 ) {
      
      this.matchingScore=userProfile.matching_score *1000
      this.needleValue=this.matchingScore;
    }
    
    this.selectedUserProfile = userProfile;
  }
}
