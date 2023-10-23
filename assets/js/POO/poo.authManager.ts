class AuthenticationManager {
    
    formulaireConnexion: HTMLFormElement|null;
    lienLogin: HTMLElement|null;
    loginMessageErreur: HTMLElement|null;
    editionBoutton: HTMLElement|null;
    editionBondeau: HTMLElement|null;
    filtre: HTMLElement|null;
    add :string;
    onLogout:any;
    constructor() {
        this.formulaireConnexion = document.querySelector(".formulaire-connexion");
        this.lienLogin = document.querySelector(".lien-login");
        this.loginMessageErreur = document.querySelector(".login-message-erreur");
        this.editionBoutton = document.querySelector(".edition-boutton");
        this.editionBondeau = document.querySelector(".edition-bondeau");
        this.filtre = document.querySelector(".filtre");
        this.add = 'oc-p7-portfolio.vincent-deramaux-portfolio.fr';

        if (this.formulaireConnexion) {
            this.setupLoginForm();
        }
    }

    initialize() {
        this.setupLogoutLink();
        this.updateLoginText();
        this.logout();
    }

    setupLoginForm() {
        
            this.formulaireConnexion?.addEventListener("submit", async (event) => {
                event.preventDefault();
                
                const email = this.formulaireConnexion?.email.value;
                const password = this.formulaireConnexion?.password.value;
                await this.callApiLogin(email, password);
                // this.logout();
            });
        
    }

    setupLogoutLink() {
        this.lienLogin?.addEventListener("click", async (event) => {
            const jeton = window.localStorage.getItem('token');
            if (jeton) {
                event.preventDefault();
                window.localStorage.removeItem("token");
            }
            this.logout();
        });
    }

    updateLoginText() {
        const jeton = window.localStorage.getItem('token');
        if (this.lienLogin !== null){
                 if (jeton) {
            this.lienLogin.textContent = "logout";
        } else {
            this.lienLogin.textContent = "login";
        }   
        }

    }

    async callApiLogin(email : string, password : string) {
        const formulaireIdentification = {
            "email": email,
            "password": password
        };

        let jeton = window.localStorage.getItem('token');

        if (jeton === null) {
            try {
                const response = await fetch(`https://${this.add}/api/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formulaireIdentification)
                });

                if (response.ok) {
                    const token = await response.json();
                    jeton = JSON.stringify(token);
                    this.callApiLoginMsgErr();
                    window.localStorage.setItem("token", jeton);
                    window.location.href = "/index.html";
                } else {

                    if (response.status === 401) {
                        this.callApiLoginMsgErr("block", "Vous avez entré de mauvais identifiants");
                    } else {
                        this.callApiLoginMsgErr("block", "Problème de connexion : veuillez essayer plus tard.");
                        throw new Error('Erreur réseau : ' + response.statusText);
                    }
                }
            } catch (err : any) {
                throw new Error("ERROR : " + err.message);
            }
        } else {
            return jeton;
        }
    }

    logout() {
        const jeton = window.localStorage.getItem('token');


        if (jeton) {
            if (this.lienLogin) {
                this.lienLogin.textContent = "logout"
            };
            if (this.editionBondeau) {
                this.editionBondeau.style.display = "flex"
            };
            if (this.editionBoutton) {
                this.editionBoutton.style.display = "flex"
            };
            if (this.filtre) {
                this.filtre.style.opacity = "0"
            };
        } else {
            if (this.lienLogin) {
                this.lienLogin.textContent = "login"
            };
            if (this.editionBondeau) {
                this.editionBondeau.style.display = "none"
            };
            if (this.editionBoutton) {
                this.editionBoutton.style.display = "none"
            };
            if (this.filtre) {
                this.filtre.style.opacity = "1"
            };
        }

        if (typeof this.onLogout === 'function') {
            if (!jeton) {
                this.onLogout(); // Appeler la fonction de gestion d'événements
            }
        }

        if (this.loginMessageErreur) {
            this.callApiLoginMsgErr("none");
        }
    }

    callApiLoginMsgErr(visible = "none", msg = "") {

        if(this.loginMessageErreur !== null){
                this.loginMessageErreur.textContent = msg;
            this.loginMessageErreur.style.display = (visible === "none") ? "none" : "block";
        }

    }
}


// Usage

const AuthManager = new AuthenticationManager();
AuthManager.initialize();

AuthManager.onLogout = () => {
    filterManager.selectButton(0);
    // galleryManager.genererGalleryDom();
};
