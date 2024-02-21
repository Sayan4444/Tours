const fs = require("fs").promises;
const path = require("path");

async function createStep(
  file: string,
  description: string,
  searchString: string,
  offset: number = 0
) {
  const filePath = path.resolve(__dirname, "..", file);
  const fileContent = await fs.readFile(filePath, "utf8");
  const lines = fileContent.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(searchString)) {
      return { file, description, line: i + 1 + offset };
    }
  }
}

async function createMainPageTour() {
  return {
    $schema: "https://aka.ms/codetour-schema",
    title: "rocket chat tours",
    steps: [
      await createStep(
        "pages/index.tsx",
        "This is the main function of the project",
        "export default function Home()"
      ),
      await createStep(
        "pages/index.tsx",
        "This button leads to templates page",
        "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
      ),
    ],
  };
}

async function main() {
  try {
    const baseDir = path.resolve(__dirname, "..");
    const newDir = path.join(baseDir, ".tours");
    await fs.mkdir(newDir, { recursive: true });
    const newFile = path.join(newDir, "rocket-chat-tours.tour");
    const mainPageTourObj = await createMainPageTour();
    console.log(mainPageTourObj);

    await fs.writeFile(newFile, JSON.stringify(mainPageTourObj, null, 2));
  } catch (error: any) {
    console.log(error.message);
  }
}

main();
