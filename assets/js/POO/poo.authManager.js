"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AuthenticationManager {
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
        var _a;
        (_a = this.formulaireConnexion) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            event.preventDefault();
            const email = (_b = this.formulaireConnexion) === null || _b === void 0 ? void 0 : _b.email.value;
            const password = (_c = this.formulaireConnexion) === null || _c === void 0 ? void 0 : _c.password.value;
            yield this.callApiLogin(email, password);
            // this.logout();
        }));
    }
    setupLogoutLink() {
        var _a;
        (_a = this.lienLogin) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
            const jeton = window.localStorage.getItem('token');
            if (jeton) {
                event.preventDefault();
                window.localStorage.removeItem("token");
            }
            this.logout();
        }));
    }
    updateLoginText() {
        const jeton = window.localStorage.getItem('token');
        if (this.lienLogin !== null) {
            if (jeton) {
                this.lienLogin.textContent = "logout";
            } else {
                this.lienLogin.textContent = "login";
            }
        }
    }
    callApiLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const formulaireIdentification = {
                "email": email,
                "password": password
            };
            let jeton = window.localStorage.getItem('token');
            if (jeton === null) {
                try {
                    const response = yield fetch(`https://${this.add}/api/users/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formulaireIdentification)
                    });
                    if (response.ok) {
                        const token = yield response.json();
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
                } catch (err) {
                    throw new Error("ERROR : " + err.message);
                }
            } else {
                return jeton;
            }
        });
    }
    logout() {
        const jeton = window.localStorage.getItem('token');
        if (jeton) {
            if (this.lienLogin) {
                this.lienLogin.textContent = "logout";
            };
            if (this.editionBondeau) {
                this.editionBondeau.style.display = "flex";
            };
            if (this.editionBoutton) {
                this.editionBoutton.style.display = "flex";
            };
            if (this.filtre) {
                this.filtre.style.opacity = "0";
            };
        } else {
            if (this.lienLogin) {
                this.lienLogin.textContent = "login";
            };
            if (this.editionBondeau) {
                this.editionBondeau.style.display = "none";
            };
            if (this.editionBoutton) {
                this.editionBoutton.style.display = "none";
            };
            if (this.filtre) {
                this.filtre.style.opacity = "1";
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
        if (this.loginMessageErreur !== null) {
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