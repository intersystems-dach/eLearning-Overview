export class Course {
  category: string;
  name: string;
  url: string;
  description: string;
  level: string;
  duration: number;
  keywords: string;
  isLearningPath: boolean = false;

  constructor(
    category: string,
    name: string,
    url: string,
    description: string,
    level: string,
    duration: number,
    keywords: string,
    isLearningPath: boolean = false
  ) {
    this.category = category;
    this.name = name;
    this.url = url;
    this.description = description;
    this.level = level;
    this.duration = duration;
    this.keywords = keywords;
    this.isLearningPath = isLearningPath;
  }

  getDurationAsString(): string {
    let durationAsString: string = '';
    if (this.duration >= 60) {
      durationAsString = Math.floor(this.duration / 60) + 'h ';
    }
    if (this.duration % 60 > 0) {
      durationAsString += (this.duration % 60) + 'min';
    }
    return durationAsString;
  }
}
