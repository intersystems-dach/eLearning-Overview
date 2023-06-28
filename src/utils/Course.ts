export class Course {
  category: string;
  name: string;
  url: string;
  description: string;
  level: string;
  duration: number;
  keywords: string;
  isLearningPath: boolean;
  bookmarked: boolean;

  constructor(
    category: string,
    name: string,
    url: string,
    description: string,
    level: string,
    duration: number,
    keywords: string,
    isLearningPath = false,
    bookmarked = false
  ) {
    this.category = category;
    this.name = name;
    this.url = url;
    this.description = description;
    this.level = level;
    this.duration = duration;
    this.keywords = keywords;
    this.isLearningPath = isLearningPath;
    this.bookmarked = bookmarked;
  }

  getDurationAsString(): string {
    let durationAsString = '';
    if (this.duration >= 60) {
      durationAsString = Math.floor(this.duration / 60) + 'h ';
    }
    if (this.duration % 60 > 0) {
      durationAsString += (this.duration % 60) + 'min';
    }
    return durationAsString;
  }

  toHTML(headingNumber: number): string {
    const html = `
      <h${headingNumber}><a href="${this.url}">
      ${this.name}
      </a></h${headingNumber}>
      <p>${this.description}</p>
      <p><i>Level: </i>${this.level}</p>
      <p><i>Duration: </i>${this.getDurationAsString()}</p>
      <p><i>Keywords: </i>${this.keywords}</p>
    `;
    return html;
  }
  toMarkdown(headingNumber: number): string {
    const heading = '#'.repeat(headingNumber);
    const markdown = `

${heading} [${this.name}](${this.url})

${this.description}

*Level:* ${this.level}

*Duration:* ${this.getDurationAsString()}

*Keywords:* ${this.keywords}
    `;
    return markdown;
  }
}
