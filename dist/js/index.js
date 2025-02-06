/**
 * There are different way to add theming to application
 * Mutating the DOM isn't the best way
 * NEEDS REFACTOR BRO ASAP!
 *
 * Here are a few ways you can look into
 * 1. Use CSS Custom Properties (CSS Variables)
 *      i. No need for new class names
 *      ii. Just work with data-theme attribute
 *      iii. Reusable variables for colors.
 *      iv. Smooth transition between themes.
 *      v. The JS file has few lines of code
 *      vi. Easy to add more themes or modify existing ones.
 *
 * 2. Use a Preprocessor (Sass/SCSS)
 *      i. Better organization for large stylesheets.
 *      ii. Easier maintenance and reuse of theme-specific styles.
 *
 * 3. Leverage the prefers-color-scheme Media Query
 *      i. No JavaScript needed.
 *      ii. Aligns with system settings by default.
 *
 * 4. Use CSS Frameworks with Built-in Dark Mode Support Tailwind
 *      i.  Quick and consistent implementation.
 *      ii. Minimal custom CSS required.
 *
 * 5. Use JavaScript for Dynamic Theme Switching
 *      i. Not mutating the DOM like you did
 *      ii. User preferences are saved and persist across sessions.
 *      iii. Works well with both dynamic and static themes.
 */

class App {
    constructor() {
        this.themeContainer = document.querySelector(".theme");
        this.themePicker = document.querySelector(".theme-picker");
        this.themeList = document.querySelector(".theme-list");

        this.themeContainer.addEventListener("click", this.openThemePicker.bind(this));
        this.themeList.addEventListener("click", this.selectTheme.bind(this));

        document.addEventListener("click", this.dismissThemePicker.bind(this));
        window.addEventListener("DOMContentLoaded", this.initializeTheme.bind(this));
    }

    dismissThemePicker(e) {
        if (e.target.classList.contains("theme-picker") || e.target.parentElement.classList.contains("theme") || e.target.parentElement.parentElement.classList.contains("theme")) {
            return
        }

        if (e.target.classList.contains("theme-list") || e.target.parentElement.classList.contains("theme-list") || e.target.parentElement.parentElement.classList.contains("theme-list")) {
            return
        }

        this.themePicker.classList.remove("display-block");
    }


    openThemePicker(e) {
        this.themePicker.classList.add("display-block");
    }

    selectTheme(e) {
        let theme;
        let usesDefault = false
        if (e.target.classList.contains("list-item")) {
            theme = e.target.dataset.theme
        } else if (e.target.parentElement.classList.contains("list-item")) {
            theme = e.target.parentElement.dataset.theme
        }

        if (theme === "default") {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = "dark"
            }
            usesDefault = true
        }

        const themeImgContainer = document.querySelector(".theme-img");
        const img = document.createElement("img");
        const span = document.createElement("span");
        span.textContent = "Theme"
        if (theme === "dark" && usesDefault === true) {
            img.setAttribute("src", "./images/os_default.svg");
        } else if (theme === "dark") {
            img.setAttribute("src", "./images/moon_dark.png");
        } else {
            img.setAttribute("src", "./images/sun_dark.png");
        }
        img.setAttribute("alt", "theme");
        themeImgContainer.innerHTML = '';
        themeImgContainer.appendChild(img);
        themeImgContainer.appendChild(span);

        if (theme === "dark") {
            this.mutateTheDOM("add")
        } else {
            this.mutateTheDOM("remove")
        }

    }

    initializeTheme(e) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.mutateTheDOM("add");
        } else {
            this.mutateTheDOM("remove");
        }

        const themeImgContainer = document.querySelector(".theme-img");
        const img = document.createElement("img");
        const span = document.createElement("span");
        span.textContent = "Theme"
        img.setAttribute("src", "./images/os_default.svg");
        img.setAttribute("alt", "theme");
        themeImgContainer.innerHTML = '';
        themeImgContainer.appendChild(img);
        themeImgContainer.appendChild(span);
    }

    mutateTheDOM(classAction) {
        if (classAction === "add") {
            document.querySelector(".body").classList.add("bg-dark");
            document.querySelector('.nav').classList.add("nav-dark");
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach((link) => {
                link.classList.add('nav-dark-a');
            })
            document.querySelector('.theme-img').classList.add("theme-img-dark");
            document.querySelector('.theme-picker').classList.add("theme-picker-dark");
            const model = document.querySelector(".model");
            const img = document.createElement('img');
            img.setAttribute('src', './images/me_no_bg.png');
            model.innerHTML = ''
            model.appendChild(img);
            document.querySelector('.hello').classList.add("hello-dark");
            document.querySelector('.about-me').classList.add("about-me-dark");
            document.querySelector('.expertise').classList.add("expertise-dark");
            const skillBoxes = document.querySelectorAll(".skill-box");
            skillBoxes.forEach((box) => {
                box.classList.add("skill-box-dark")
                box.querySelector('.lang').classList.add('lang-dark')
                box.querySelectorAll('a').forEach(link => {
                    link.classList.add('link-dark');
                    link.querySelector('img').classList.add('link-img-dark');
                });
            })
            document.querySelectorAll('.heading').forEach((heading) => {
                heading.classList.add("heading-dark");
            });
            const projects = document.querySelectorAll('.project-box')
            projects.forEach((project) => {
                project.classList.add("project-box-dark");
                project.querySelector('.desc').classList.add('desc-dark');
            });
            const clients = document.querySelectorAll(".client-box");
            clients.forEach((client) => {
                client.classList.add('client-box-dark');
                client.querySelector('.comment').classList.add('comment-dark')
            });
            document.querySelector('.footer').classList.add('footer-dark');
        } else {
            document.querySelector(".body").classList.remove("bg-dark");
            document.querySelector('.nav').classList.remove("nav-dark");
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach((link) => {
                link.classList.remove('nav-dark-a');
            })
            document.querySelector('.theme-img').classList.remove("theme-img-dark");
            document.querySelector('.theme-picker').classList.remove("theme-picker-dark");
            const model = document.querySelector(".model");
            const img = document.createElement('img');
            img.setAttribute('src', './images/me.jpg');
            model.innerHTML = ''
            model.appendChild(img);
            document.querySelector('.hello').classList.remove("hello-dark");
            document.querySelector('.about-me').classList.remove("about-me-dark");
            document.querySelector('.expertise').classList.remove("expertise-dark");
            const skillBoxes = document.querySelectorAll(".skill-box");
            skillBoxes.forEach((box) => {
                box.classList.remove("skill-box-dark")
                box.querySelector('.lang').classList.remove('lang-dark')
                box.querySelectorAll('a').forEach(link => {
                    link.classList.remove('link-dark');
                    link.querySelector('img').classList.remove('link-img-dark');
                });
            })
            document.querySelectorAll('.heading').forEach((heading) => {
                heading.classList.remove("heading-dark");
            });
            const projects = document.querySelectorAll('.project-box')
            projects.forEach((project) => {
                project.classList.remove("project-box-dark");
                project.querySelector('.desc').classList.remove('desc-dark');
            });
            const clients = document.querySelectorAll(".client-box");
            clients.forEach((client) => {
                client.classList.remove('client-box-dark');
                client.querySelector('.comment').classList.remove('comment-dark')
            });
            document.querySelector('.footer').classList.remove('footer-dark');
        }
    }

}

new App();