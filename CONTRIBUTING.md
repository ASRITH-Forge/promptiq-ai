# 🤝 Contributing to PromptIQ AI

Thank you for considering contributing to **PromptIQ AI**! 🎉

We welcome all contributions, whether it's bug fixes, new features, documentation improvements, UI enhancements, or ideas to improve the project.

---

## 🚀 How to Contribute

### Fork the Repository

1. Click the **Fork** button on the top right of the original repository.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/promptiq-ai.git
cd promptiq-ai
```

---

### Create a New Branch

For a new feature:

```bash
git checkout -b feature/your-feature-name
```

For a bug fix (referencing issue number if available):

```bash
git checkout -b fix/issue-123-short-title
```

---

### Make Your Changes

* Follow the project's coding style.
* Add comments where necessary.
* Update documentation if needed.
* Ensure your changes do not break existing functionality.

---

### Commit Your Changes

```bash
git commit -m "feat: add your feature description"
```

---

### Push to Your Branch

```bash
git push origin feature/your-feature-name
```

---

### Open a Pull Request

1. Go to your forked repository on GitHub.
2. Click **New Pull Request**.
3. Describe your changes clearly.
4. Reference any related issues if applicable.

---

## 🧑‍💻 Development Guidelines

### Branching Strategy

Always create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
git checkout -b fix/your-fix-name
```

❌ Don't commit directly to `main`.

---

### Code Style

#### Frontend

* Use **camelCase** for variables and functions.
* Use **PascalCase** for React components.
* Keep components small, reusable, and maintainable.
* Use meaningful names for files, variables, and functions.

#### Backend

* Follow RESTful API conventions.
* Organize routes, controllers, models, and middleware properly.
* Handle errors gracefully and return appropriate HTTP status codes.
* Keep business logic separated from route definitions.

---

### Commit Messages

Use the **Conventional Commits** format:

```text
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code restructuring
test: add or update tests
chore: maintenance tasks
```



---

### Testing & Validation

Run the application locally before pushing changes.

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
npm install
npm run server
```

Make sure:

* No console errors appear.
* APIs are functioning correctly.
* Authentication flows work properly.
* Chat creation and messaging work as expected.

---

### Dependencies

* Avoid adding unnecessary npm packages.
* If a new dependency is required, explain why in the Pull Request description.
* Keep package versions compatible with the existing project setup.

---

## 🔥 Pull Requests (PRs)

Please ensure that your Pull Request:

* Focuses on a single feature or fix.
* Includes a clear title and description.
* References related issues when applicable.
* Includes screenshots or GIFs for UI changes.
* Passes all local testing before submission.


---

## 🐛 Reporting Issues

If you find a bug or have a feature request:

1. Open an Issue.
2. Provide clear steps to reproduce the problem.
3. Include screenshots or logs when possible.
4. Suggest a possible solution if you have one.

---

## ❤️ Code of Conduct

Please be respectful, constructive, and inclusive in all interactions.


