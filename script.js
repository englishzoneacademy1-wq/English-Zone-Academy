        let targetedCourse = "";

        // Tab selection switching logic
        function switchTab(event, panelId) {
            const panels = document.getElementsByClassName("content-display-panel");
            for(let i=0; i<panels.length; i++) {
                panels[i].classList.remove("active");
            }
            
            const buttons = document.getElementsByClassName("selector-btn");
            for(let i=0; i<buttons.length; i++) {
                buttons[i].classList.remove("active");
            }
            
            document.getElementById(panelId).classList.add("active");
            event.currentTarget.classList.add("active");
        }

        // About Us Tab Switching
        function switchAboutTab(event, tabId) {
            const tabs = document.getElementsByClassName("about-tab-content");
            for(let i=0; i<tabs.length; i++) {
                tabs[i].classList.remove("active");
            }
            const btns = document.getElementsByClassName("about-lang-tab");
            for(let i=0; i<btns.length; i++) {
                btns[i].classList.remove("active");
            }
            document.getElementById(tabId).classList.add("active");
            event.currentTarget.classList.add("active");
        }

        // ✅ Updated: Open modal with optional sub-choices
        function triggerEnrollmentModal(courseTitle, options) {
            // Reset form
            document.getElementById("fullName").value = "";
            document.getElementById("studentAge").value = "";
            document.getElementById("contactPhone").value = "";

            targetedCourse = courseTitle;
            document.getElementById("targetCourseLabel").innerText = courseTitle;

            // Handle options
            var optionsArea = document.getElementById("modalOptionsArea");
            var optionsList = document.getElementById("modalOptionsList");
            var optionsTitle = document.getElementById("modalOptionsTitle").querySelector("span");

            if (options && options.length > 0) {
                optionsTitle.innerText = "اختر التخصص:";
                var html = "";
                for (var i = 0; i < options.length; i++) {
                    var isSelected = (i === 0) ? " selected" : "";
                    var isChecked = (i === 0) ? " checked" : "";
                    var priceHtml = options[i].price ? '<span class="opt-price">' + options[i].price + '</span>' : '';
                    html += '<div class="modal-option-item' + isSelected + '" onclick="selectModalOption(this, \'' + courseTitle + '\', \'' + options[i].value + '\')">' +
                                '<input type="radio" name="modalOption" value="' + options[i].value + '"' + isChecked + ' onclick="event.stopPropagation(); selectModalOption(this.parentElement, \'' + courseTitle + '\', \'' + options[i].value + '\')">' +
                                '<span class="opt-label">' + options[i].label + '</span>' +
                                priceHtml +
                            '</div>';
                }
                optionsList.innerHTML = html;
                optionsArea.classList.add("show");

                // Set initial course name with first option
                targetedCourse = courseTitle + " - " + options[0].value;
                document.getElementById("targetCourseLabel").innerText = targetedCourse;
            } else {
                optionsList.innerHTML = "";
                optionsArea.classList.remove("show");
            }

            document.getElementById("enrollmentModal").classList.add("active");
        }

        // ✅ Handle option selection in modal
        function selectModalOption(element, courseTitle, optionValue) {
            // Remove selected from all
            var allItems = document.querySelectorAll(".modal-option-item");
            for (var i = 0; i < allItems.length; i++) {
                allItems[i].classList.remove("selected");
                allItems[i].querySelector("input[type='radio']").checked = false;
            }
            // Select this one
            element.classList.add("selected");
            element.querySelector("input[type='radio']").checked = true;

            // Update course name
            targetedCourse = courseTitle + " - " + optionValue;
            document.getElementById("targetCourseLabel").innerText = targetedCourse;
        }

        // Close modal popup
        function dismissEnrollmentModal() {
            document.getElementById("enrollmentModal").classList.remove("active");
        }

        // Format information and forward directly to active whatsapp endpoint
        function executeWhatsAppReservation() {
            const nameVal = document.getElementById("fullName").value.trim();
            const ageVal = document.getElementById("studentAge").value.trim();
            const phoneVal = document.getElementById("contactPhone").value.trim();

            if(!nameVal || !ageVal || !phoneVal) {
                alert("يرجى تعبئة كافة الحقول المطلوبة لإكمال عملية الحجز بنجاح.");
                return;
            }

            const constructedMessage = `مرحباً أكاديمية English Zone
` +
                                       `أود الاستفسار والتسجيل في:
` +
                                       `الكورس: ${targetedCourse}

` +
                                       `بيانات المشترك:
` +
                                       `الاسم: ${nameVal}
` +
                                       `السن: ${ageVal} سنة
` +
                                       `رقم الهاتف: ${phoneVal}

` +
                                       `شكراً لكم وفي انتظار تأكيد موعد تحديد المستوى والبدء.`;

            const whatsappUrl = `https://wa.me/201018008845?text=${encodeURIComponent(constructedMessage)}`;
            window.open(whatsappUrl, '_blank');
            dismissEnrollmentModal();
        }

        // Close overlay if background target is clicked
        window.onclick = function(e) {
            const overlay = document.getElementById("enrollmentModal");
            if(e.target === overlay) {
                dismissEnrollmentModal();
            }
        }