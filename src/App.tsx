// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: 'normal';
  description: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: 'submission';
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

function Header({ name }: { name: string }) {
  return (
    <h1>{name}</h1>
  );
}

function Content({ part }: { part: CoursePartBase }) {
  return (
    <div>
      <p>
        <b>
          {part.name}
          {' '}
          {part.exerciseCount}
        </b>
      </p>

      {(part.type === 'normal' || part.type === 'submission') && (
        <p>
          <i>{(part as CourseNormalPart).description}</i>
        </p>
      )}
      {part.type === 'groupProject' && (
        <p>
          project exercises
          {' '}
          {(part as CourseProjectPart).groupProjectCount}
        </p>
      )}
      {part.type === 'submission' && (
        <p>
          submit to
          {' '}
          {(part as CourseSubmissionPart).exerciseSubmissionLink}
        </p>
      )}
    </div>
  );
}

function Total({ courseParts }: { courseParts: Array<any> }) {
  return (
    <p>
      Number of exercises
      {' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is the easy course part',
    type: 'normal',
  },
  {
    name: 'Advanced',
    exerciseCount: 7,
    description: 'This is the hard course part',
    type: 'normal',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    type: 'groupProject',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    type: 'submission',
  },
];

function App() {
  const courseName = 'Half Stack application development';
  return (
    <div>
      <Header name={courseName} />
      {courseParts.map((cp) => <Content key={cp.name} part={cp} />)}
      <Total courseParts={courseParts} />
    </div>
  );
}

export default App;
