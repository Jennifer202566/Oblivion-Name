/**
 * Oblivion Name Generator
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Reduce vertical spacing in hero section and race section
    const heroSection = document.querySelector('.hero');
    const raceSection = document.querySelector('.races');
    const raceGrid = document.querySelector('.race-grid');
    
    if (heroSection) {
        heroSection.style.padding = '2rem 0';
        
        // Reduce spacing in hero content
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.maxWidth = '800px';
            heroContent.style.margin = '0 auto';
            
            // Reduce margins in hero content elements
            const heroH2 = heroContent.querySelector('h2');
            const heroP = heroContent.querySelector('p');
            if (heroH2) heroH2.style.marginBottom = '0.5rem';
            if (heroP) heroP.style.marginBottom = '1rem';
        }
    }
    
    if (raceSection) {
        raceSection.style.paddingTop = '1rem';
        
        // Reduce spacing in race section header
        const raceSectionH2 = raceSection.querySelector('h2');
        const raceSectionP = raceSection.querySelector('p');
        if (raceSectionH2) raceSectionH2.style.marginBottom = '0.5rem';
        if (raceSectionP) raceSectionP.style.marginBottom = '0.5rem';
    }
    
    if (raceGrid) {
        raceGrid.style.marginTop = '1rem';
        raceGrid.style.gap = '1rem';
        
        // Hide Orc race card from first screen
        const orcCard = document.querySelector('.orc-card');
        if (orcCard) {
            orcCard.style.display = 'none';
        }
        
        // Change button text to "[Race] Name Generator"
        const generateButtons = document.querySelectorAll('.generate-button');
        generateButtons.forEach(button => {
            const raceName = button.parentElement.querySelector('h3').textContent;
            button.textContent = `${raceName} Name Generator`;
        });
    }
    
    // Modify naming conventions section to include only 9 races (exclude Orc)
    const rulesGrid = document.querySelector('.rules-grid');
    if (rulesGrid) {
        const orcRuleCard = Array.from(rulesGrid.querySelectorAll('.rule-card')).find(card => 
            card.querySelector('h3') && card.querySelector('h3').textContent === 'Orc Names'
        );
        
        if (orcRuleCard) {
            orcRuleCard.style.display = 'none';
        }
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to race cards on scroll
    const raceCards = document.querySelectorAll('.race-card:not(.orc-card)');
    
    if (raceCards.length > 0) {
        const animateCards = () => {
            raceCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for animation
        raceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run animation on load and scroll
        window.addEventListener('scroll', animateCards);
        animateCards(); // Run once on page load
    }
    
    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        const highlightNavLink = () => {
            const scrollPosition = window.scrollY + 100; // Adjust for header height
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        
        window.addEventListener('scroll', highlightNavLink);
        highlightNavLink(); // Run once on page load
    }
    
    // Add CSS class for active nav links
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: var(--accent-color);
        }
        nav a.active::after {
            width: 100%;
        }
        
        /* Reduce spacing in hero and race sections */
        .hero {
            padding: 2rem 0;
        }
        
        .hero h2 {
            margin-bottom: 0.5rem;
        }
        
        .hero p {
            margin-bottom: 1rem;
        }
        
        .races {
            padding-top: 1rem;
        }
        
        .races h2 {
            margin-bottom: 0.5rem;
        }
        
        .races > .container > p {
            margin-bottom: 0.5rem;
        }
        
        .race-grid {
            margin-top: 1rem;
            gap: 1rem;
        }
        
        .race-card {
            margin-bottom: 0;
        }
        
        .race-card h3 {
            padding: 0.75rem 1rem 0.25rem;
        }
        
        .race-card p {
            padding: 0 1rem;
            min-height: 60px;
            margin-bottom: 0.5rem;
        }
        
        .generate-button {
            margin: 0.75rem 1rem;
            padding: 0.75rem;
        }
        
        /* Move "Choose Your Race" section to first screen */
        #races {
            padding-top: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add mobile menu functionality
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (header && nav) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('div');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            
            // Add mobile menu button to header
            header.querySelector('.container').appendChild(mobileMenuBtn);
            
            // Add mobile menu functionality
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
            
            // Add CSS for mobile menu
            const mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                @media (max-width: 768px) {
                    nav {
                        display: none;
                        width: 100%;
                        padding-top: 1rem;
                    }
                    
                    nav.active {
                        display: block;
                    }
                    
                    nav ul {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    nav li {
                        margin: 0.5rem 0;
                    }
                    
                    .mobile-menu-btn {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 30px;
                        height: 21px;
                        cursor: pointer;
                    }
                    
                    .mobile-menu-btn span {
                        display: block;
                        width: 100%;
                        height: 3px;
                        background-color: var(--light-text);
                        border-radius: 3px;
                        transition: var(--transition);
                    }
                    
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: translateY(9px) rotate(45deg);
                    }
                    
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: translateY(-9px) rotate(-45deg);
                    }
                }
                
                @media (min-width: 769px) {
                    .mobile-menu-btn {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(mobileStyle);
        }
    };
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Add back-to-top button
    const createBackToTopButton = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
        
        // Add CSS for back-to-top button
        const backToTopStyle = document.createElement('style');
        backToTopStyle.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background-color: var(--primary-color);
                color: var(--light-text);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2rem;
                box-shadow: var(--shadow);
                opacity: 0;
                visibility: hidden;
                transition: var(--transition);
                z-index: 99;
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background-color: var(--hover-color);
                transform: translateY(-5px);
            }
            
            /* Add Font Awesome arrow icon */
            .back-to-top i {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-top: 2px solid var(--light-text);
                border-left: 2px solid var(--light-text);
                transform: rotate(45deg);
                margin-top: 4px;
            }
        `;
        document.head.appendChild(backToTopStyle);
        
        // Show/hide back-to-top button based on scroll position
        const toggleBackToTopButton = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', toggleBackToTopButton);
        
        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
const useBtn = document.createElement('button');
useBtn.textContent = 'Use';
useBtn.addEventListener('click', function() {
    nameResult.textContent = name;
});

    
    // Initialize back-to-top button
    createBackToTopButton();
    
    // Add lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        // You could add a lazy loading library here if needed
    }
    
    // Add race name databases for the generator pages
    // These will be used by the individual race generator pages
    window.nameData = {
        imperial: {
            male: {
                prefixes: ["Ant", "Aug", "Cas", "Cic", "Cla", "Dec", "Fla", "Jul", "Luc", "Mar", "Oct", "Pub", "Qui", "Ser", "Tit", "Val"],
                suffixes: ["inus", "ius", "us", "ian", "io", "entius", "onius", "atus", "ianus", "inius", "icus", "atus", "ius", "ianus", "illian", "inian"]
            },
            female: {
                prefixes: ["Ant", "Aug", "Cas", "Cic", "Cla", "Dec", "Fla", "Jul", "Luc", "Mar", "Oct", "Pub", "Qui", "Ser", "Tit", "Val"],
                suffixes: ["ia", "a", "ina", "illa", "inia", "iana", "idia", "onia", "entia", "ilia", "isia", "ivia", "elia", "inia", "ilia", "onia"]
            },
            surnames: ["Septim", "Mede", "Umbranox", "Caro", "Valerius", "Tullius", "Maro", "Cosades", "Scipio", "Aurelius", "Motierre", "Polus", "Lex", "Camoran", "Mantus", "Vitellus"]
        },
        nord: {
            male: {
                prefixes: ["Ag", "Bal", "Bor", "Dag", "Fen", "Gal", "Har", "Ing", "Jor", "Kjar", "Lem", "Mog", "Rag", "Skj", "Tor", "Ulf"],
                suffixes: ["nar", "mund", "olf", "mar", "rir", "grim", "ald", "bjorn", "gar", "sten", "olf", "nar", "mund", "olf", "mar", "rir"]
            },
            female: {
                prefixes: ["Ast", "Bor", "Dag", "Eil", "Fre", "Gre", "Hil", "Ing", "Jor", "Kar", "Lis", "Mjo", "Rag", "Sig", "Tor", "Vig"],
                suffixes: ["a", "hild", "run", "ny", "rid", "borg", "dis", "ja", "lief", "unn", "vor", "dra", "na", "hild", "run", "ny"]
            },
            surnames: ["Battle-Born", "Gray-Mane", "Stone-Fist", "Ice-Veins", "Snow-Shod", "Shatter-Shield", "Frost-Hammer", "Bear-Claw", "Wolf-Sister", "Storm-Blade", "Iron-Kettle", "Mead-Drinker", "Troll-Killer", "Bone-Breaker", "Shield-Maiden", "Sword-Singer"]
        },
        breton: {
            male: {
                prefixes: ["Al", "Ber", "Cla", "Dom", "Ed", "Fra", "Gas", "Hen", "Jac", "Lou", "Mat", "Nic", "Oli", "Pie", "Rob", "The"],
                suffixes: ["ain", "ard", "ent", "ic", "ien", "ier", "in", "is", "ois", "on", "ot", "ques", "ric", "ton", "vin", "y"]
            },
            female: {
                prefixes: ["Ad", "Bea", "Cel", "Dan", "Eli", "Flo", "Gab", "Hel", "Isa", "Jos", "Kat", "Lou", "Mar", "Nat", "Oli", "Pau"],
                suffixes: ["a", "elle", "enne", "ette", "ia", "ie", "ine", "ique", "ise", "onne", "rice", "rie", "se", "sie", "te", "vie"]
            },
            surnames: ["Motierre", "Jend", "Amelion", "Delacroix", "Dubois", "Fontaine", "Gautier", "Laurent", "Mercier", "Moreau", "Petit", "Renault", "Rousseau", "Thibault", "Valmont", "Beaumont"]
        },
        redguard: {
            male: {
                prefixes: ["Ah", "Az", "Bah", "Cas", "Dah", "Fah", "Hak", "Ish", "Jah", "Kas", "Mah", "Nah", "Raz", "Sah", "Tar", "Zah"],
                suffixes: ["ad", "ar", "ed", "eem", "id", "if", "im", "ir", "iz", "oud", "ud", "uf", "ul", "ur", "us", "ut"]
            },
            female: {
                prefixes: ["Ah", "Ami", "Bas", "Cey", "Dah", "Fat", "Has", "Ish", "Jah", "Kar", "Lal", "Mah", "Nad", "Rah", "Sah", "Zah"],
                suffixes: ["a", "ah", "ara", "eda", "eema", "ia", "ida", "ima", "ira", "iya", "ma", "nah", "ra", "sha", "ya", "za"]
            },
            surnames: ["al-Suda", "at-Tura", "al-Danir", "al-Hareem", "al-Kadim", "al-Miran", "al-Rihad", "at-Sentinel", "al-Azif", "al-Hazzar", "al-Skaven", "al-Tamina", "al-Yusuf", "al-Zabir", "al-Hammid", "al-Farid"]
        },
        dunmer: {
            male: {
                prefixes: ["Ath", "Bal", "Cas", "Dra", "Eth", "Fal", "Gal", "Hel", "Ilm", "Jur", "Kil", "Lle", "Mal", "Ner", "Oth", "Rhy"],
                suffixes: ["yn", "is", "os", "us", "as", "en", "il", "im", "ys", "ar", "ur", "an", "on", "yn", "is", "os"]
            },
            female: {
                prefixes: ["Alm", "Bel", "Cla", "Dra", "Elv", "Fav", "Gil", "Hel", "Ild", "Jan", "Kyn", "Lle", "Mil", "Nal", "Oht", "Rhy"],
                                suffixes: ["a", "era", "i", "esi", "ala", "yna", "yra", "isa", "ana", "ura", "asi", "ora", "a", "era", "i", "esi"]
            },
            surnames: ["Hlaalu", "Redoran", "Telvanni", "Indoril", "Dres", "Sadras", "Aryon", "Llethri", "Mora", "Dralor", "Theran", "Venim", "Reloth", "Sarethi", "Uvulas", "Dren"]
        },
        altmer: {
            male: {
                prefixes: ["Aer", "Cal", "Eld", "Fal", "Gal", "Hyr", "Ily", "Kel", "Lor", "Man", "Nal", "Ond", "Pha", "Qua", "Ryn", "Sil"],
                suffixes: ["ion", "imo", "inar", "ion", "irion", "ius", "or", "oro", "uril", "we", "yon", "ion", "imo", "inar", "ion", "irion"]
            },
            female: {
                prefixes: ["Aer", "Cal", "Eld", "Fal", "Gal", "Hyr", "Ily", "Kel", "Lor", "Man", "Nal", "Ond", "Pha", "Qua", "Ryn", "Sil"],
                suffixes: ["wen", "iel", "iwen", "anya", "inde", "ine", "ire", "isse", "ith", "wen", "iel", "iwen", "anya", "inde", "ine", "ire"]
            },
            surnames: ["Direnni", "Camoran", "Septim", "Karoodil", "Valerian", "Aedile", "Larethian", "Meterrenis", "Rilis", "Mothril", "Camorin", "Salobar", "Kintyra", "Auridon", "Alinor", "Lillandril"]
        },
        bosmer: {
            male: {
                prefixes: ["Adh", "Bal", "Cir", "Dro", "Elb", "Fal", "Gal", "Hal", "Ind", "Jur", "Kel", "Len", "Mal", "Nim", "Ond", "Pir"],
                suffixes: ["dir", "dor", "fin", "ion", "is", "ith", "or", "orn", "os", "th", "we", "dir", "dor", "fin", "ion", "is"]
            },
            female: {
                prefixes: ["Adh", "Bal", "Cir", "Dro", "Elb", "Fal", "Gal", "Hal", "Ind", "Jur", "Kel", "Len", "Mal", "Nim", "Ond", "Pir"],
                suffixes: ["a", "iel", "ith", "wen", "wyn", "a", "iel", "ith", "wen", "wyn", "a", "iel", "ith", "wen", "wyn", "a"]
            },
            surnames: ["Willowthorn", "Oakenheart", "Greenleaf", "Silverfrond", "Fernbrook", "Pinebranch", "Mossfoot", "Leafdancer", "Rootwalker", "Vineheart", "Treewind", "Acornshield", "Barkstrider", "Dewdrop", "Eldergrove", "Frostleaf"]
        },
        orc: {
            male: {
                prefixes: ["Bor", "Dush", "Gat", "Ghor", "Gol", "Gro", "Kha", "Kru", "Log", "Mog", "Mub", "Nar", "Ogr", "Shar", "Ugh", "Yag"],
                suffixes: ["ak", "ash", "bag", "bur", "dush", "gak", "gol", "goth", "groth", "kh", "mak", "nak", "rag", "ruk", "ub", "um"]
            },
            female: {
                prefixes: ["Ag", "Bor", "Dul", "Gat", "Gha", "Gra", "Kha", "Kru", "Lum", "Maz", "Mog", "Nar", "Osh", "Sha", "Ug", "Yaz"],
                suffixes: ["a", "ah", "da", "ga", "gra", "ka", "ma", "na", "ra", "sha", "ta", "tha", "uma", "ura", "za", "zra"]
            },
            surnames: ["gro-Bagrat", "gro-Shak", "gro-Dushnikh", "gro-Largash", "gro-Khash", "gro-Bolmog", "gro-Gortwog", "gro-Abamath", "gro-Shargam", "gro-Dular", "gro-Barak", "gro-Nagrob", "gro-Ugdush", "gro-Yagak", "gro-Murzog", "gro-Luzgan"]
        },
        argonian: {
            prefixes: ["Beem", "Deep", "Gah", "Haj", "Jee", "Kee", "Lifts", "Makes", "Nee", "Ocheeva", "Pees", "Quill", "Scouts", "Swims", "Talen", "Walks"],
            suffixes: ["-Ja", "-Ei", "-Dar", "-Eix", "-Julan", "-Kilaya", "-Lei", "-Mah", "-Neeus", "-Ra", "-Tei", "-Veezara", "-Wum", "-Xoc", "-Zaw", "-Zen"],
            descriptors: ["Many-Waters", "Scales", "Softly", "Swiftly", "Quietly", "Brightly", "Deeply", "Sharply", "Coldly", "Warmly", "Quickly", "Slowly", "Carefully", "Silently", "Loudly", "Proudly"]
        },
        khajiit: {
            prefixes: ["Dar", "Do", "Dro", "J'", "Ja'", "Jo'", "Ka'", "Kha", "La'", "Ma'", "Qa'", "Ra'", "Ri'", "S'", "Sha", "Za'"],
            suffixes: ["dar", "go", "jo", "ra", "rgo", "ri", "sien", "tabe", "zargo", "zir", "dar", "go", "jo", "ra", "rgo", "ri"],
            titles: ["the Swift", "the Clever", "the Strong", "the Wise", "the Thief", "the Hunter", "the Warrior", "the Mage", "the Healer", "the Merchant", "the Traveler", "the Pilgrim", "the Wanderer", "the Exile", "the Outcast", "the Nomad"]
        }
    };
    
    // Add more race name data for variety
    const extendNameData = () => {
        // Imperial additional data
        window.nameData.imperial.male.prefixes.push("Ber", "Cor", "Dio", "Emi", "Fel", "Gra", "Hor", "Ign", "Jus", "Kal");
        window.nameData.imperial.female.prefixes.push("Aur", "Bla", "Cor", "Dom", "Emi", "Fel", "Gra", "Hor", "Iul", "Jun");
        window.nameData.imperial.surnames.push("Antonius", "Bellamont", "Carvain", "Draconis", "Elenwen", "Faleria", "Gratian", "Hayn", "Inian", "Junius");
        
        // Nord additional data
        window.nameData.nord.male.prefixes.push("Arn", "Bjar", "Cnut", "Egil", "Fro", "Gun", "Hak", "Iva", "Jar", "Kol");
        window.nameData.nord.female.prefixes.push("Arn", "Bri", "Cai", "Eri", "Fri", "Gun", "Hel", "Idi", "Jor", "Kat");
        window.nameData.nord.surnames.push("Axe-Bearer", "Blood-Hand", "Cold-Wind", "Dragon-Slayer", "Eagle-Eye", "Frost-Born", "Giant-Killer", "Hammer-Heart", "Ice-Blood", "Jorg-Son");
        
        // Breton additional data
        window.nameData.breton.male.prefixes.push("Ala", "Bel", "Cha", "Dav", "Eti", "Fer", "Gil", "Hug", "Iva", "Jea");
        window.nameData.breton.female.prefixes.push("Ala", "Bri", "Cha", "Del", "Emi", "Fel", "Gis", "Hel", "Isa", "Jul");
        window.nameData.breton.surnames.push("Artois", "Belmont", "Chastain", "Dufont", "Etienne", "Fontaine", "Gautier", "Herrick", "Ivory", "Janvier");
        
        // Redguard additional data
        window.nameData.redguard.male.prefixes.push("Aba", "Bah", "Cyr", "Dar", "Ebe", "Far", "Gha", "Has", "Ibr", "Jaf");
        window.nameData.redguard.female.prefixes.push("Aba", "Bah", "Cyr", "Dar", "Ebe", "Far", "Gha", "Has", "Ibr", "Jaf");
        window.nameData.redguard.surnames.push("al-Aswad", "al-Bakaara", "al-Cyrene", "al-Dravarol", "al-Ebonarm", "al-Fihad", "al-Ghazali", "al-Hassan", "al-Ibrahim", "al-Jaffar");
        
        // Dunmer additional data
        window.nameData.dunmer.male.prefixes.push("Ara", "Bra", "Cla", "Dre", "Eno", "For", "Gav", "Hla", "Ind", "Jir");
        window.nameData.dunmer.female.prefixes.push("Ara", "Bre", "Cla", "Dre", "Eno", "Fav", "Gav", "Hla", "Ind", "Jir");
        window.nameData.dunmer.surnames.push("Andrano", "Balvel", "Cardri", "Dreloth", "Elval", "Falas", "Gavyn", "Hlervu", "Indarys", "Joran");
        
        // Altmer additional data
        window.nameData.altmer.male.prefixes.push("Aer", "Bel", "Cel", "Dar", "Eld", "Fin", "Gil", "Hal", "Ing", "Jus");
        window.nameData.altmer.female.prefixes.push("Aer", "Bel", "Cel", "Dar", "Eld", "Fin", "Gil", "Hal", "Ing", "Jus");
        window.nameData.altmer.surnames.push("Aedirn", "Belthil", "Celorien", "Darinil", "Elsinore", "Finedhel", "Gilraen", "Halcyon", "Ingsol", "Justarius");
        
        // Bosmer additional data
        window.nameData.bosmer.male.prefixes.push("Ara", "Bra", "Cir", "Dar", "Elb", "Fin", "Gal", "Har", "Ill", "Jor");
        window.nameData.bosmer.female.prefixes.push("Ara", "Bra", "Cir", "Dar", "Elb", "Fin", "Gal", "Har", "Ill", "Jor");
        window.nameData.bosmer.surnames.push("Arrowswift", "Branchsong", "Cedarfoot", "Dawnleaf", "Elmheart", "Fernwalker", "Greenwood", "Hazelglade", "Ivythorn", "Juniperbend");
        
        // Orc additional data
        window.nameData.orc.male.prefixes.push("Aba", "Baz", "Cru", "Dru", "Eza", "Feg", "Gul", "Hag", "Iga", "Jub");
        window.nameData.orc.female.prefixes.push("Aba", "Baz", "Cru", "Dru", "Eza", "Feg", "Gul", "Hag", "Iga", "Jub");
        window.nameData.orc.surnames.push("gro-Agamph", "gro-Bagrakh", "gro-Crug", "gro-Duma", "gro-Ezag", "gro-Fharun", "gro-Gulum", "gro-Hagra", "gro-Igron", "gro-Jubub");
        
        // Argonian additional data
        window.nameData.argonian.prefixes.push("Climbs", "Dances", "Eyes", "Finds", "Greets", "Hunts", "Ices", "Jumps", "Knows", "Looks");
        window.nameData.argonian.suffixes.push("-Rana", "-Shei", "-Tei", "-Uwa", "-Vee", "-Wum", "-Xal", "-Yeel", "-Zaw", "-Zan");
        window.nameData.argonian.descriptors.push("Through-Trees", "With-Shadows", "Like-Stars", "Hidden-Treasure", "Many-Friends", "Swift-Prey", "Cold-Waters", "High-Mountains", "Ancient-Secrets", "Beyond-Horizon");
        
        // Khajiit additional data
        window.nameData.khajiit.prefixes.push("Ab'", "Ba'", "Co'", "Da'", "El'", "Fa'", "Ga'", "Ha'", "Ib'", "Ji'");
        window.nameData.khajiit.suffixes.push("ban", "dar", "gra", "har", "iq", "jhan", "kir", "lir", "mir", "nir");
        window.nameData.khajiit.titles.push("the Shadow", "the Quick", "the Nimble", "the Cunning", "the Stalker", "the Prowler", "the Whisperer", "the Night-Eye", "the Moon-Singer", "the Star-Gazer");
    };
    
    // Initialize extended name data
    extendNameData();
    
    // Function to generate random names for each race
    // This will be used by the individual race generator pages
    window.generateName = function(race, gender) {
        const raceData = window.nameData[race.toLowerCase()];
        
        if (!raceData) {
            return "Invalid race selected";
        }
        
        let name = "";
        
        // Special case for Argonian names
        if (race.toLowerCase() === "argonian") {
            const prefix = raceData.prefixes[Math.floor(Math.random() * raceData.prefixes.length)];
            const suffix = raceData.suffixes[Math.floor(Math.random() * raceData.suffixes.length)];
            const descriptor = raceData.descriptors[Math.floor(Math.random() * raceData.descriptors.length)];
            
            // 50% chance to use descriptor format
            if (Math.random() > 0.5) {
                name = `${prefix}-${descriptor}`;
            } else {
                name = `${prefix}${suffix}`;
            }
            
            return name;
        }
        
        // Special case for Khajiit names
        if (race.toLowerCase() === "khajiit") {
            const prefix = raceData.prefixes[Math.floor(Math.random() * raceData.prefixes.length)];
            const suffix = raceData.suffixes[Math.floor(Math.random() * raceData.suffixes.length)];
            
            // 30% chance to add a title
            if (Math.random() < 0.3) {
                const title = raceData.titles[Math.floor(Math.random() * raceData.titles.length)];
                name = `${prefix}${suffix} ${title}`;
            } else {
                name = `${prefix}${suffix}`;
            }
            
            return name;
        }
        
        // For other races
        const genderData = gender && raceData[gender.toLowerCase()] ? raceData[gender.toLowerCase()] : 
                          (raceData.male && raceData.female ? (Math.random() > 0.5 ? raceData.male : raceData.female) : null);
        
        if (!genderData) {
            return "Invalid gender selected";
        }
        
        const prefix = genderData.prefixes[Math.floor(Math.random() * genderData.prefixes.length)];
        const suffix = genderData.suffixes[Math.floor(Math.random() * genderData.suffixes.length)];
        
        name = prefix + suffix;
        
        // 70% chance to add surname for most races
        if (Math.random() < 0.7 && raceData.surnames) {
            const surname = raceData.surnames[Math.floor(Math.random() * raceData.surnames.length)];
            
            // Special case for Orc surnames with gender prefix
            if (race.toLowerCase() === "orc") {
                if (gender && gender.toLowerCase() === "male") {
                    name = `${name} gro-${surname.replace("gro-", "")}`;
                } else if (gender && gender.toLowerCase() === "female") {
                    name = `${name} gra-${surname.replace("gro-", "")}`;
                } else {
                    name = `${name} ${surname}`;
                }
            } else {
                name = `${name} ${surname}`;
            }
        }
        
        return name;
    };
});