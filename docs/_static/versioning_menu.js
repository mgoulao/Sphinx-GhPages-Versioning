(() => {
    basePath = "/Sphinx-GhPages-Versioning"
    fetch(`${basePath}/_static/versioning_menu.html`).then(response => {
        if (response.status === 200) {
            response.text().then(text => {
                const container = document.createElement("div");
                container.innerHTML = text;
                document.querySelector("body").appendChild(container);
                // innerHtml doenst evaluate scripts, we need to add them dynamically
                Array.from(container.querySelectorAll("script")).forEach(oldScript => {
                    const newScript = document.createElement("script");
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });
            });
        } else {
            console.warn("Unable to load versioning menu", response);
        }
    });
})()