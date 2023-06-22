import { Injectable } from '@angular/core';
import { Course } from 'src/utils/Course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  allCourses: Course[] = [];
  courses: Course[] = [];
  categories: string[] = [];

  searchString = '';
  typeFilter = '';
  categoryFilter = '';
  levelFilter = '';
  durationFilter = '';

  constructor() {
    this.initCourses();
    this.courses = this.allCourses;
    this.categories = this.getCategories();
  }

  filter() {
    const words = this.searchString.split(' ');
    let result: Course[] = [];
    if (this.searchString == '') {
      result = this.allCourses;
    } else {
      for (const word of words) {
        for (const course of this.allCourses) {
          if (
            !result.includes(course) &&
            (course.name.toLowerCase().includes(word) ||
              course.description.toLowerCase().includes(word) ||
              course.level.includes(word) ||
              course.keywords.toLowerCase().includes(word))
          ) {
            result.push(course);
          }
        }
      }
    }
    this.courses = result.filter((course) => {
      return (
        this.filterType(course) &&
        this.filterCategory(course) &&
        this.filterLevel(course) &&
        this.filterDuration(course)
      );
    });
  }

  filterType(course: Course): boolean {
    if (this.typeFilter == '') {
      return true;
    }
    return course.isLearningPath == (this.typeFilter === 'learning path');
  }

  filterCategory(course: Course): boolean {
    if (this.categoryFilter == '') {
      return true;
    }
    return course.category == this.categoryFilter;
  }

  filterLevel(course: Course): boolean {
    if (this.levelFilter == '') {
      return true;
    }
    return course.level == this.levelFilter;
  }

  filterDuration(course: Course): boolean {
    if (this.durationFilter == '') {
      return true;
    }
    if (this.durationFilter == '< 30 min') {
      return course.duration < 30;
    } else if (this.durationFilter == '30 - 60 min') {
      return course.duration >= 30 && course.duration <= 60;
    } else if (this.durationFilter == '1 - 2 h') {
      return course.duration >= 60 && course.duration <= 120;
    } else if (this.durationFilter == '2 - 4 h') {
      return course.duration >= 120 && course.duration <= 240;
    }
    return course.duration > 240;
  }

  getCategories(): string[] {
    const result: string[] = [];
    for (let i = 0; i < this.allCourses.length; i++) {
      if (!result.includes(this.allCourses[i].category)) {
        result.push(this.allCourses[i].category);
      }
    }
    return this.sortAlphabetically(result);
  }

  getLevels(): string[] {
    const result: string[] = [];
    for (let i = 0; i < this.allCourses.length; i++) {
      if (!result.includes(this.allCourses[i].level)) {
        result.push(this.allCourses[i].level);
      }
    }
    return result;
  }

  sortAlphabetically(array: string[]): string[] {
    return array.sort((a, b) => {
      return a.localeCompare(b);
    });
  }
  sortCourseAlphabetically(array: Course[]): Course[] {
    return array.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  getCourseByCategory(category: string): Course[] {
    const result: Course[] = [];
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].category === category) {
        result.push(this.courses[i]);
      }
    }
    return this.sortCourseAlphabetically(result);
  }

  initCourses() {
    this.allCourses.push(
      new Course(
        'General',
        'Building a Server-Side Application with InterSystems',
        'https://learning.intersystems.com/course/view.php?id=967',
        'Learn to create new classes, work with objects, and run SQL queries using InterSystems ObjectScript, the built-in language for InterSystems products.',
        'Beginner',
        300,
        'class definition, object oriented programming, getting started, capstone exercise',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'General',
        'Deploying InterSystems IRIS in Containers and the Cloud',
        'https://learning.intersystems.com/course/view.php?id=2141',
        'Use a scalable deployment strategy to add reliability to any InterSystems IRIS data platform implementation. In this learning path, see how to create cloud- and container-based deployments for InterSystems IRIS. First, outline your system and deployment specifications. Then, review examples of deployments and try your own to determine which approach is best for your system.',
        'Beginner',
        195,
        'K8, K8s, IKO, Kube, Kubernetes, AWS, GCP, Azure, Docker, ICM, Cloud Manager',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'General',
        'InterSystems IRIS Management Basics',
        'https://learning.intersystems.com/course/view.php?id=1825',
        'Learn the basics of InterSystems IRIS data platform and the tools that help system administrators perform common tasks through the lifecycle of their products.',
        'Beginner',
        600,
        'install, installation, mirroring, security, monitor, scalability, performance, system continuity, high availability, upgrade, troubleshoot, system administration, manage',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Build Data Models Using Adaptive Analytics',
        'https://learning.intersystems.com/course/view.php?id=1791',
        'InterSystems IRIS Adaptive Analytics uses AtScale technology to offer a robust collection of self-service data discovery and analytics capabilities, integrating seamlessly with the technology you are already using, like Tableau, Excel, and many others.',
        'Beginner',
        135,
        'cubes, OLAP, install, Business Intelligence',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Predicting Outcomes with IntegratedML in InterSystems IRIS',
        'https://learning.intersystems.com/course/view.php?id=1346',
        'Leverage the power of machine learning with IntegratedML, a feature of InterSystems IRIS data platform that allows SQL developers to build, train, and run predictive models via SQL commands in their applications. In this learning path, get an introduction to IntegratedML and see how you can start making predictions with your data.',
        'Beginner',
        150,
        'ML, relational, executive, predict, AI, data science',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Building Business Integrations with InterSystems IRIS',
        'https://learning.intersystems.com/course/view.php?id=1437',
        'With the interoperability framework of InterSystems IRIS data platform, interface engineers and software developers can connect multiple systems and quickly route messages to downstream applications. In this learning path, learn the basics of integration and see how to send, receive, process, and transform data using built-in and custom options.',
        'Advanced',
        360,
        'Ensemble, data transformations, DTL, integration engine, production',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Building Custom Integrations',
        'https://learning.intersystems.com/course/view.php?id=397',
        'Learn to build custom interoperability components in InterSystems ObjectScript to add to your InterSystems IRIS data platform productions. This learning path is designed for software developers who need to develop custom business services, processes, and operations for their productions.',
        'Advanced',
        285,
        'custom messages, BPL, integration, interoperability, custom components, business service, business operation, business process',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'API Management',
        'Configuring InterSystems IRIS Applications for Client Access',
        'https://learning.intersystems.com/course/view.php?id=1975',
        'Learn how to set up an InterSystems IRIS data platform application to act as the back end of a web application. See how to expose your InterSystems IRIS application to REST so data can be accessed by external systems or users, and learn how to consume and produce JSON data with your application for easy data interchange.',
        'Advanced',
        270,
        'API Manager, Web Development, Backend',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'API Management',
        'Controlling API Traffic with API Manager',
        'https://learning.intersystems.com/course/view.php?id=1435',
        'Connect InterSystems API Manager to your InterSystems products to better monitor and control traffic to and from your web-based APIs. Learn what API Manager is, see how to set it up, and start managing your APIs.',
        'Beginner',
        165,
        'load balancing, traffic control, rate limiting, REST, IAM, plugins, calls, services, routes, traffic, monitoring, controlling, API Management',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Connecting .NET Applications to InterSystems Products',
        'https://learning.intersystems.com/course/view.php?id=968',
        'Connect your .NET applications to InterSystems products and technologies using ADO .NET, XEP, Entity Framework, or the Native API.',
        'Beginner',
        180,
        ' ',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Connecting Java Applications to InterSystems Products',
        'https://learning.intersystems.com/course/view.php?id=879',
        'Connect your Java applications to InterSystems products and technologies using your choice of APIs: JDBC, XEP, Hibernate, or the Native API.',
        'Beginner',
        180,
        '',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Connecting Node.js Applications to InterSystems Products',
        'https://learning.intersystems.com/course/view.php?id=1108',
        'Connect your Node.js applications to InterSystems products and technologies using ODBC or the Native API for InterSystems IRIS data platform.',
        'Beginner',
        60,
        '',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Writing Python Applications with InterSystems',
        'https://learning.intersystems.com/course/view.php?id=1943',
        'Leverage your existing Python coding skills to enhance InterSystems applications. Learn how to connect client Python applications, embed Python with InterSystems ObjectScript code, or optimize Python library calls using a separate server when calls require heavy processing.',
        'Beginner',
        90,
        'native API, Embedded Python, Object Gateway, InterSystems Python SDK, pyodbc',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'Analyzing Data with Health Insight',
        'https://learning.intersystems.com/course/view.php?id=2140',
        'See how to use HealthShare Health Insight to identify trends in healthcare data and optimize care. Learn the underlying technologies that help you get the most out of Health Insight, such as interoperability tools that allow you to integrate with other health systems and view shared data. Then see how to configure notifications to clinicians about cohorts of patients.',
        'Beginner',
        345,
        'analyze, analysis, actionable insight',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'Building Basic FHIR Integrations with InterSystems IRIS for Health',
        'https://learning.intersystems.com/course/view.php?id=1959',
        'Learn the basics of building HL7 FHIR applications using InterSystems IRIS for Health.',
        'Beginner',
        255,
        'healthcare interoperability',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'Building Basic HL7 V2 Integrations with InterSystems',
        'https://learning.intersystems.com/course/view.php?id=1350',
        'Integrating your legacy systems with InterSystems IRIS for Health allows you to extract more value from healthcare data.',
        'Beginner',
        390,
        'rules, custom components, business services, business processes, business operations, DTL, exercise, capstone, integrate, interoperability',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'Installing Unified Care Record',
        'https://learning.intersystems.com/course/view.php?id=2262',
        'Learn how to install HealthShare Unified Care Record for development, demo, or production systems.',
        'Beginner',
        150,
        'kit, implement, UCR',
        true
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'Managing Providers with HealthShare Provider Directory',
        'https://learning.intersystems.com/course/view.php?id=1510',
        'See how InterSystems HealthShare Provider Directory allows you to manage and maintain accurate provider records, providing a single source of truth for provider information across a healthcare network.',
        'Beginner',
        120,
        'facilities, doctors, specialists, managing, sources',
        true
      )
    );

    this.allCourses.push(
      new Course(
        'Development',
        'Installing VS Code and Configuring InterSystems Server Connections',
        'https://learning.intersystems.com/course/view.php?id=1782',
        'Discover the latest InterSystems extensions in Visual Studio Code. Using VS Code, connect to InterSystems servers for client-side and server-side source code editing.',
        'Beginner',
        25,
        'VSC, Visual Studio, IDE, VSCode',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'Creating an InterSystems Class Definition in Visual Studio Code',
        'https://learning.intersystems.com/course/view.php?id=1768',
        'Learn the structure and basic syntax of class definitions and how to develop an InterSystems IRIS data platform class definition in Visual Studio Code. You will also learn how to define class members, such as properties, parameters, and methods.',
        'Beginner',
        60,
        'ISC1131, vs code',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'Deploying and Customizing InterSystems IRIS Containers',
        'https://learning.intersystems.com/course/view.php?id=2170',
        'Get an overview of InterSystems IRIS data platform containers in this quick, hands-on exercise. Discover the purpose and benefits of containers, and see how they are implemented.',
        'Beginner',
        30,
        'Docker, CE, community edition, image, images, durable %SYS, license key, commit, firstlook',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'Embedded Python QuickStart',
        'https://learning.intersystems.com/course/view.php?id=1824',
        'See how you can use Embedded Python in InterSystems IRIS data platform to access thousands of Python libraries and get low-latency access to data using a flexible combination of Python and InterSystems ObjectScript code.',
        'Beginner',
        10,
        'Language Interoperability, py, script, module, library, pandas',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'Exploring Multiple Data Models with Globals',
        'https://learning.intersystems.com/course/view.php?id=2189',
        'Learn how to use globals, the data model native to InterSystems IRIS data platform, to improve the efficiency and flexibility of your data storage.',
        'Beginner',
        10,
        'tree, native, firstlook',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'InterSystems ObjectScript Basics',
        'https://learning.intersystems.com/course/view.php?id=959',
        'Learn the foundations of InterSystems ObjectScript and create scripts, variables, commands, and operators in InterSystems IRIS data platform.',
        'Beginner',
        90,
        'expressions, ISC1069',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'Building Applications with InterSystems IRIS and Angular',
        'https://learning.intersystems.com/course/view.php?id=1676',
        'Build an Angular application that leverages InterSystems IRIS data platform.',
        'Advanced',
        90,
        'ISC1093, node, node.js, vscode, REST',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Development',
        'Streamlining Development and Distribution with InterSystems Package Manager',
        'https://learning.intersystems.com/course/view.php?id=2127',
        'Modularize and distribute your InterSystems ObjectScript code. Store your modules in a public or private repository, then automatically install them in your InterSystems IRIS deployments.',
        'Beginner',
        60,
        'ISC1168, ZPM, IPM, module, import, repository, registry, Open Exchange, test coverage, unit test',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Data Transformations Basics',
        'https://learning.intersystems.com/course/view.php?id=1502',
        'Learn to create data transformations with the graphical Management Portal interface. See how to map fields, use functions to modify the fields, and use literals as values for the fields. At the end, you will learn how to test and implement the transformation.',
        'Beginner',
        60,
        'Ensemble, architecture, graphs, DTL, data transformation language, ISC1003',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Getting Started with InterSystems Reports',
        'https://learning.intersystems.com/course/view.php?id=1538',
        'Create and publish banded, crosstab, and bar chart reports using InterSystems Reports, and easily make your data accessible to end users.',
        'Beginner',
        45,
        'Logi Report, JReport, Zen Report, Virtual Summit 2020, Global Summit 2020',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Hands-On with IntegratedML',
        'https://learning.intersystems.com/course/view.php?id=1535',
        'IntegratedML â€“ the machine learning component built into InterSystems IRIS data platform â€“ solves problems in a number of fields, including healthcare. In this exercise, you will use IntegratedML to create, train, and execute a predictive model on a set of sample patient data to predict readmissions.',
        'Advanced',
        45,
        'SQL, commands, zeppelin, ML, validate, provider, configuration, select, Virtual Summit 2020, Global Summit 2020',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'InterSystems IRIS Adaptive Analytics Essentials',
        'https://learning.intersystems.com/course/view.php?id=1715',
        'Learn to build highly customizable data models with InterSystems IRIS Adaptive Analytics, powered by AtScale. Adaptive Analytics is available starting with version 2020.1 of InterSystems IRIS data platform. Get an introduction to the software, and apply what you have learned in hands-on exercises.',
        'Advanced',
        120,
        'ISC1155, data source, library, column, dimension, measure, degenerate, IRIS BI',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Running Fast Queries with SQL in InterSystems IRIS',
        'https://learning.intersystems.com/course/view.php?id=1054',
        'Try out the high-performance SQL features of InterSystems IRIS data platform by running sample code and querying sample data in a lab environment. You will see the different methods of running SQL in InterSystems IRIS, and some of the features that make InterSystems SQL efficient and easy to use.',
        'Beginner',
        10,
        'implicit joins, bitmap indices, indexes, query, queries, firstlook',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Optimizing SQL Queries in InterSystems IRIS',
        'https://learning.intersystems.com/course/view.php?id=2228',
        'See how to optimize SQL queries in InterSystems IRIS data platform by showing and interpreting query plans, adding bitslice and bitmap indices, and reviewing your queryâ€™s performance over time.',
        'Advanced',
        15,
        'ISC1173, bitmap, bitslice, query plan, SQL shell, index, firstlook',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Working with Data',
        'Using JSON in InterSystems IRIS',
        'https://learning.intersystems.com/course/view.php?id=972',
        'Learn how to work with JSON data in InterSystems IRIS data platform, which models JSON using dynamic entities. Find out how to consume and generate JSON data, handle errors, and troubleshoot your application.',
        'Advanced',
        45,
        'dynamic objects, dynamic arrays, troubleshooting, ISC1051',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Building BPL Business Processes',
        'https://learning.intersystems.com/course/view.php?id=2030',
        'Learn how to build a BPL business process using the Business Process Designer in the Management Portal.',
        'Advanced',
        90,
        'ISC1066, custom components, Ensemble, Health Connect, designing, creating, call activities, testing, business process language',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Building Custom Business Operations',
        'https://learning.intersystems.com/enrol/index.php?id=2029',
        'Learn how to build and implement custom business operations to communicate with downstream systems in an InterSystems integration.',
        'Beginner',
        90,
        'ISC1064, business components, messaging, request, response, method, message map, production, interoperability, ensemble',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Building Custom Business Services',
        'https://learning.intersystems.com/enrol/index.php?id=2031',
        'Learn how to create a custom business service to receive data from upstream systems and relay messages to other components in an InterSystems production.',
        'Advanced',
        90,
        'ISC1072, custom business components, SQL, design, creation, implementation, OnProcessInput',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Creating Interoperability Productions Using PEX',
        'https://learning.intersystems.com/course/view.php?id=1668',
        'Learn how to develop interoperability productions using the Production EXtension framework (PEX), which allows you to create custom business components and adapters in either .NET or Java.',
        'Difficult',
        60,
        'ISC1152, Production Extension, Polyglot Extension, Ensemble, Object gateway, Dynamic Gateway, Custom Components, Java Business Host',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Designing Productions (Non-Healthcare)',
        'https://learning.intersystems.com/course/view.php?id=619',
        'Review best practices for designing productions in InterSystems IRIS data platform and InterSystems Ensemble, including conventions for databases, namespaces, and components.',
        'Advanced',
        30,
        'Caché, cache, DTL, Integration Engine, Interoperability, ISC1078',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Introduction to Troubleshooting Productions',
        'https://learning.intersystems.com/course/view.php?id=1172',
        'Learn how to troubleshoot productions in InterSystems IRIS data platform, InterSystems Ensemble, and InterSystems HealthShare. Review the locations and purposes of Management Portal pages for viewing logs, messages, queues, and jobs.',
        'Advanced',
        30,
        'Ensemble, debugging',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Interoperability',
        'Monitoring Remotely with MQTT',
        'https://learning.intersystems.com/course/view.php?id=2184',
        'Use the interoperability tools built into InterSystems IRIS for Health to construct a basic user portal that monitors live health readings from a set of remote patients. You will use a minimal amount of code to quickly take real-time data coming from an MQTT broker, then save and display it on a dashboard.',
        'Beginner',
        25,
        'ISC1172, Message Queuing Telemetry Transport, message protocol, IoT, MQTT 3.1, gettingstarted',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'API Management',
        'Hands-On with InterSystems API Manager for Developers',
        'https://learning.intersystems.com/course/view.php?id=1747',
        'Use InterSystems API Manager to manage APIs for a coffee maker application within InterSystems IRIS data platform.',
        'Beginner',
        120,
        'ISC1159, IAM, REST, tier-based access',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'API Management',
        'Setting Up RESTful Services',
        'https://learning.intersystems.com/course/view.php?id=1298',
        'Learn how to set up a RESTful service in InterSystems IRIS data platform, using an API to define how client applications interact with your service.',
        'Advanced',
        90,
        'ISC1076, Cache, Network, Routing, HTTP',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Configuration',
        'Backup and Restore',
        'https://learning.intersystems.com/course/view.php?id=770',
        'Learn how to back up and restore your InterSystems Caché or InterSystems IRIS data platform system and design an effective backup strategy.',
        'Beginner',
        60,
        'restoring, security, incremental, cumulative, differential, ISC1089',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Configuration',
        'Configuring Role-Based Access',
        'https://learning.intersystems.com/course/view.php?id=2157',
        'Learn how to secure your system and specify the actions that each user of InterSystems IRIS data platform can perform.',
        'Beginner',
        15,
        'users, roles, resources, security, firstlook',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Configuration',
        'InterSystems Security Basics',
        'https://learning.intersystems.com/course/view.php?id=1774',
        'Learn the basics of the security model in InterSystems IRIS data platform as well as the different aspects of security in InterSystems products from the users in the system all the way through the assets they seek access to. This course will enable you to properly secure your applications and data.',
        'Beginner',
        60,
        'ISC1082, LDAP, Kerberos, delegated, resource, asset, role, privilege, user',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        '.NET QuickStart',
        'https://learning.intersystems.com/course/view.php?id=1065',
        'Learn how to build a .NET application to connect to InterSystems IRIS data platform using one or more APIs â€” ADO .NET, XEP, the Native API, and Entity Framework â€” by running the sample code provided.',
        'Beginner',
        10,
        'Visual Studio, exercise, overview, dotnet, multi-language',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Designing a Java Connection Strategy',
        'https://learning.intersystems.com/course/view.php?id=904',
        'Learn how you can connect your Java applications to InterSystems IRIS data platform using JDBC, the Native API for InterSystems IRIS, XEP, or Hibernate.',
        'Beginner',
        30,
        'multi-model, multimodal, bulk ingestion, globals, ISC1129',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Node.js QuickStart',
        'https://learning.intersystems.com/course/view.php?id=1092',
        'Learn how to build a Node.js application to connect to InterSystems IRIS data platform through the Native API by running the sample code provided.',
        'Beginner',
        5,
        'Visual Studio Code, exercise, overview, language',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'External Languages',
        'Using Multi-Model with Python and Node.js ',
        'https://learning.intersystems.com/course/view.php?id=2179',
        'Learn about the multi-model capability of InterSystems IRIS data platform and create a Node.js application that sends JSON data straight to your database instance without any parsing or mapping. In this exercise, you will use Python, JavaScript, and InterSystems ObjectScript to interact with the data.',
        'Beginner',
        45,
        'Multimodel, pyodbc, %JSON.Adapter, gettingstarted',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'Designing Healthcare Productions',
        'https://learning.intersystems.com/enrol/index.php?id=1285',
        'Review best practices for designing productions in InterSystems HealthShare, including conventions for databases, namespaces, and components. Learn how to set up HealthShare as a development environment and to build and test productions.',
        'Advanced',
        30,
        'Ensemble, HL7, DTL, Integration Engine, Interoperability, ISC1060',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'FHIR R4 Integration QuickStart',
        'https://learning.intersystems.com/course/view.php?id=1492',
        'Learn how to build HL7 FHIR applications within InterSystems IRIS for Health, then try a hands-on exercise to build an application that retrieves, stores, and transforms HL7 FHIR data and converts data between HL7 FHIR and legacy HL7 V2 systems.',
        'Beginner',
        10,
        'FHIR repository, fast healthcare interoperability resources, healthcare integration, FIRE, HL7 FHIR, FHIR, GET, POST, SDA, data transformation, allergy, patient.',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'HL7 Business Services and Business Operations',
        'https://learning.intersystems.com/course/view.php?id=1393',
        'Learn how to create, configure, and copy business services and business operations used for input and output of HL7 V2 messages in an InterSystems IRIS data platform production.',
        'Advanced',
        30,
        'ISC1149, TCP, file, business component',
        false
      )
    );
    this.allCourses.push(
      new Course(
        'Health',
        'HealthShare Patient Index Overview',
        'https://learning.intersystems.com/course/view.php?id=2135',
        'Explore HealthShare Patient Index tools like the Worklist, audit log, and Data Quality tool. Learn the basic principles for automated and manual activities and see how to successfully manage patient identities.',
        'Beginner',
        90,
        'ISC1004, MPI, EMPI, Worklist, Audit Log, Tuning, N.I.C.E Process, Thresholds, Rules, Search Panel',
        false
      )
    );
  }

  extra() {
    const extra = [];
    extra.push(
      new Course(
        'Phil',
        'OwnObjectScriptExtension',
        'https://github.com/phil1436/ownobjectscriptextension',
        'A Visual Studio Code extension that supplies tools for InterSystems ObjectScript.',
        'Beginner',
        1,
        'Phil',
        false
      )
    );
    extra.push(
      new Course(
        'Phil',
        'OwnGitExtension',
        'https://github.com/phil1436/owngitextension',
        'A Visual Studio Code Extension that offers tools for working with GitHub projects.',
        'Beginner',
        1,
        'Phil',
        false
      )
    );
    extra.push(
      new Course(
        'Phil',
        'OwnVscodeExtension',
        'https://github.com/phil1436/ownvscodeextension',
        'Providing tools for Microsofts Visual Studio Code.',
        'Beginner',
        1,
        'Phil',
        false
      )
    );
    extra.push(
      new Course(
        'Phil',
        'phil-online',
        'https://github.com/phil1436/phil-online',
        ' A simple personal website to show my projects and stuff.',
        'Beginner',
        1,
        'Phil',
        false
      )
    );
    extra.push(
      new Course(
        'Phil',
        'Petgram',
        'https://github.com/phil1436/Petgram',
        'Just a social media platform for pets. You can upload your pets and share them with the world. You can also like and comment on other peoples pets.',
        'Beginner',
        1,
        'Phil',
        false
      )
    );
    extra.push(
      new Course(
        'Phil',
        'Color-Chicken',
        'https://github.com/phil1436/Color-Chicken',
        'Be a feathered chameleon, master the hurdles in Color Chicken! ',
        'Beginner',
        1,
        'Phil',
        false
      )
    );
    this.allCourses = this.allCourses.concat(extra);
    this.courses = this.courses.concat(extra);
    this.categories = this.getCategories();
  }
}
