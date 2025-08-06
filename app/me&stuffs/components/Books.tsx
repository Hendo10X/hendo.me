export default function BooksIReadRecommended() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Welcome to Books I read recommended
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Here are some of the books I read and recommended
            </p>
          </header>

          <div className="text-foreground font-inter font-light leading-relaxed text-sm md:text-base">
            <ol className="list-decimal list-inside my-4 space-y-2 ml-4">
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Clean Code by Robert C. Martin
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  The Pragmatic Programmer by Andrew Hunt & David Thomas
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Refactoring by Martin Fowler
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Dont-Make-Think-Revised-Usability/dp/0321965515"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Don't Make Me Think by Steve Krug
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Designing-Interfaces-Focal-Press-Technology/dp/1558605931"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Designing Interfaces by Jenifer Tidwell
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/You-Dont-Know-JS-up-Front/dp/1491904240"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  You Don't Know JS (book series) by Kyle Simpson
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  JavaScript: The Good Parts by Douglas Crockford
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Deep Work by Cal Newport
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Atomic Habits by James Clear
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  The Mythical Man-Month by Frederick P. Brooks Jr.
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Design-Everyday-Things-Donald-Norman/dp/0465050654"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  The Design of Everyday Things by Don Norman
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Soft-Skills-software-developers-manual/dp/1617291994"
                  className="hover:underline   hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Soft Skills: The software developer's life manual by John
                  Sonmez
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  The Phoenix Project by Gene Kim, Kevin Behr, and George
                  Spafford
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Rework-Jason-Fried/dp/0307463745"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  Rework by Jason Fried & David Heinemeier Hansson
                </a>
              </li>
              <li className="text-foreground">
                <a
                  href="https://www.amazon.com/Art-Computer-Programming-Volumes-1-4/dp/0201485672"
                  className="hover:underline  hover:text-muted-foreground"
                  target="_blank"
                  rel="noopener noreferrer">
                  The Art of Computer Programming by Donald Knuth
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
