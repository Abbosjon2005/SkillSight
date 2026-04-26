@component
export class SkillSightController extends BaseScriptComponent {
    @input titleText: Text
    @input welcomeText: Text
    @input instructionText: Text
    @input objectLabel: Text
    @input arrowText: Text
    @input progressText: Text
    @input feedbackText: Text
    @input choiceText: Text
    @input scoreText: Text
    @input objectPromptText: Text
    @input modeText: Text
    @input aiText: Text
    @input answerStatusText: Text
    @input scanText: Text
    @input reticleText: Text
    @input impactText: Text
    @input timerText: Text
    @input useCaseText: Text
    @input iconText: Text
    @input safetyIconText: Text
    @input completeIconText: Text
    @input nextObjectText: Text
    @input monitorLabel: Text
    @input monitorPanel: SceneObject
    @input scanBeam: SceneObject
    @input keyboardFrameTop: SceneObject
    @input keyboardFrameBottom: SceneObject
    @input keyboardFrameLeft: SceneObject
    @input keyboardFrameRight: SceneObject
    @input monitorFrameTop: SceneObject
    @input monitorFrameBottom: SceneObject
    @input monitorFrameLeft: SceneObject
    @input monitorFrameRight: SceneObject
    @input progressBarFill: SceneObject
    @input soundStatusText: Text
    @input finalPitchText: Text
    @input keyboardHologram: SceneObject
    @input monitorHologram: SceneObject
    @input reticleRing: SceneObject
    @input completionBadgeText: Text

    private step = 0
    private scanBeamStartX = 0
    private scanBeamReady = false
    private keyboardBaseX = 1
    private keyboardBaseY = 1
    private keyboardBaseZ = 1
    private monitorBaseX = 1
    private monitorBaseY = 1
    private monitorBaseZ = 1
    private reticleBaseX = 1
    private reticleBaseY = 1
    private reticleBaseZ = 1

    onAwake() {
        if (!this.titleText || !this.welcomeText || !this.instructionText) {
            return
        }

        if (this.scanBeam) {
            this.scanBeamStartX = this.scanBeam.getTransform().getLocalPosition().x
            this.scanBeamReady = true
        }

        if (this.keyboardHologram) {
            const keyboardScale = this.keyboardHologram.getTransform().getLocalScale()
            this.keyboardBaseX = keyboardScale.x
            this.keyboardBaseY = keyboardScale.y
            this.keyboardBaseZ = keyboardScale.z
        }

        if (this.monitorHologram) {
            const monitorScale = this.monitorHologram.getTransform().getLocalScale()
            this.monitorBaseX = monitorScale.x
            this.monitorBaseY = monitorScale.y
            this.monitorBaseZ = monitorScale.z
        }

        if (this.reticleRing) {
            const reticleScale = this.reticleRing.getTransform().getLocalScale()
            this.reticleBaseX = reticleScale.x
            this.reticleBaseY = reticleScale.y
            this.reticleBaseZ = reticleScale.z
        }

        const updateEvent = this.createEvent("UpdateEvent")
        updateEvent.bind(() => {
            this.updateScanBeam()
            this.updateHolograms()
            this.updateReticleRing()
        })

        this.showStep()

        const tapEvent = this.createEvent("TapEvent")
        tapEvent.bind(() => {
            this.nextStep()
        })
    }

    updateScanBeam() {
        if (!this.scanBeam || !this.scanBeamReady || !this.scanBeam.enabled) {
            return
        }

        const transform = this.scanBeam.getTransform()
        const position = transform.getLocalPosition()
        const offset = Math.sin(getTime() * 4) * 18

        position.x = this.scanBeamStartX + offset
        transform.setLocalPosition(position)
    }

    updateHolograms() {
        const pulse = 1 + Math.sin(getTime() * 3) * 0.08

        if (this.keyboardHologram && this.keyboardHologram.enabled) {
            const transform = this.keyboardHologram.getTransform()
            const scale = transform.getLocalScale()

            scale.x = this.keyboardBaseX * pulse
            scale.y = this.keyboardBaseY * pulse
            scale.z = this.keyboardBaseZ * pulse

            transform.setLocalScale(scale)
        }

        if (this.monitorHologram && this.monitorHologram.enabled) {
            const transform = this.monitorHologram.getTransform()
            const scale = transform.getLocalScale()

            scale.x = this.monitorBaseX * pulse
            scale.y = this.monitorBaseY * pulse
            scale.z = this.monitorBaseZ * pulse

            transform.setLocalScale(scale)
        }
    }

    updateReticleRing() {
        if (!this.reticleRing || !this.reticleRing.enabled) {
            return
        }

        const pulse = 1 + Math.sin(getTime() * 5) * 0.18
        const transform = this.reticleRing.getTransform()
        const scale = transform.getLocalScale()

        scale.x = this.reticleBaseX * pulse
        scale.y = this.reticleBaseY * pulse
        scale.z = this.reticleBaseZ

        transform.setLocalScale(scale)
    }

    nextStep() {
        this.step += 1

        if (this.step > 12) {
            this.step = 0
        }

        this.showStep()
    }

    setObjectGuide(label: string, arrow: string) {
        if (this.objectLabel) {
            this.objectLabel.text = label
        }

        if (this.arrowText) {
            this.arrowText.text = arrow
        }
    }

    setProgress(text: string) {
        if (this.progressText) {
            this.progressText.text = text
        }
    }

    setFeedback(text: string) {
        if (this.feedbackText) {
            this.feedbackText.text = text
        }
    }

    setChoice(text: string) {
        if (this.choiceText) {
            this.choiceText.text = text
        }
    }

    setScore(text: string) {
        if (this.scoreText) {
            this.scoreText.text = text
        }
    }

    setPrompt(text: string) {
        if (this.objectPromptText) {
            this.objectPromptText.text = text
        }
    }

    setMode(text: string) {
        if (this.modeText) {
            this.modeText.text = text
        }
    }

    setAI(text: string) {
        if (this.aiText) {
            this.aiText.text = text
        }
    }

    setAnswerStatus(text: string) {
        if (this.answerStatusText) {
            this.answerStatusText.text = text
        }
    }

    setScan(text: string) {
        if (this.scanText) {
            this.scanText.text = text
        }
    }

    setReticle(text: string) {
        if (this.reticleText) {
            this.reticleText.text = text
        }
    }

    setImpact(text: string) {
        if (this.impactText) {
            this.impactText.text = text
        }
    }

    setTimer(text: string) {
        if (this.timerText) {
            this.timerText.text = text
        }
    }

    setUseCase(text: string) {
        if (this.useCaseText) {
            this.useCaseText.text = text
        }
    }

    setNextObject(text: string) {
        if (this.nextObjectText) {
            this.nextObjectText.text = text
        }
    }

    setSoundStatus(text: string) {
        if (this.soundStatusText) {
            this.soundStatusText.text = text
        }
    }

    setFinalPitch(text: string) {
        if (this.finalPitchText) {
            this.finalPitchText.text = text
        }
    }

    setCompletionBadge(text: string) {
        if (this.completionBadgeText) {
            this.completionBadgeText.text = text
        }
    }

    setMonitorVisual(visible: boolean) {
        if (this.monitorLabel) {
            this.monitorLabel.text = visible ? "MONITOR" : ""
        }

        if (this.monitorPanel) {
            this.monitorPanel.enabled = visible
        }
    }

    setScanBeam(visible: boolean) {
        if (this.scanBeam) {
            this.scanBeam.enabled = visible
        }
    }

    setReticleRing(visible: boolean) {
        if (this.reticleRing) {
            this.reticleRing.enabled = visible
        }
    }

    setKeyboardFrame(visible: boolean) {
        if (this.keyboardFrameTop) {
            this.keyboardFrameTop.enabled = visible
        }

        if (this.keyboardFrameBottom) {
            this.keyboardFrameBottom.enabled = visible
        }

        if (this.keyboardFrameLeft) {
            this.keyboardFrameLeft.enabled = visible
        }

        if (this.keyboardFrameRight) {
            this.keyboardFrameRight.enabled = visible
        }
    }

    setKeyboardHologram(visible: boolean) {
        if (this.keyboardHologram) {
            this.keyboardHologram.enabled = visible
        }
    }

    setMonitorFrame(visible: boolean) {
        if (this.monitorFrameTop) {
            this.monitorFrameTop.enabled = visible
        }

        if (this.monitorFrameBottom) {
            this.monitorFrameBottom.enabled = visible
        }

        if (this.monitorFrameLeft) {
            this.monitorFrameLeft.enabled = visible
        }

        if (this.monitorFrameRight) {
            this.monitorFrameRight.enabled = visible
        }
    }

    setMonitorHologram(visible: boolean) {
        if (this.monitorHologram) {
            this.monitorHologram.enabled = visible
        }
    }

    setProgressBar(stepNumber: number) {
        if (!this.progressBarFill) {
            return
        }

        const clampedStep = Math.max(0, Math.min(stepNumber, 12))
        const width = 6 + (clampedStep / 12) * 64
        const transform = this.progressBarFill.getTransform()
        const scale = transform.getLocalScale()
        const position = transform.getLocalPosition()

        scale.x = width
        scale.y = 2
        scale.z = 1

        position.x = -60 + width / 2
        position.y = 35
        position.z = -78

        transform.setLocalScale(scale)
        transform.setLocalPosition(position)
    }

    setIcons(scan: string, safety: string, complete: string) {
        if (this.iconText) {
            this.iconText.text = scan
        }

        if (this.safetyIconText) {
            this.safetyIconText.text = safety
        }

        if (this.completeIconText) {
            this.completeIconText.text = complete
        }
    }

    showStep() {
        this.setObjectGuide("", "")
        this.setChoice("")
        this.setAnswerStatus("")
        this.setIcons("", "", "")
        this.setMonitorVisual(false)
        this.setScanBeam(false)
        this.setReticleRing(false)
        this.setKeyboardFrame(false)
        this.setKeyboardHologram(false)
        this.setMonitorFrame(false)
        this.setMonitorHologram(false)
        this.setFinalPitch("")
        this.setCompletionBadge("")
        this.setProgressBar(this.step)

        if (this.step === 0) {
            this.setScanBeam(true)
            this.setReticleRing(true)
            this.setSoundStatus("Audio cue: scanning")
            this.setMode("Mode: Guided Lesson")
            this.setProgress("Ready")
            this.setFeedback("Tap to continue")
            this.setScore("Score: 0/2")
            this.setPrompt("Point at the keyboard")
            this.setAI("AI Coach: explains what you are looking at")
            this.setScan("Scanning real-world object...")
            this.setReticle("◎")
            this.setImpact("For hands-on training, safety, and accessible learning")
            this.setTimer("Time: 01:00")
            this.setUseCase("Use case: engineering labs, onboarding, and safety training")
            this.setNextObject("Current object: Keyboard")
            this.setIcons("🔍", "", "")
            this.titleText.text = "SkillSight AR"
            this.welcomeText.text = "Turn any workspace into a learning environment."
            this.instructionText.text = "Tap to begin."
        }

        if (this.step === 1) {
            this.setScanBeam(true)
            this.setReticleRing(true)
            this.setKeyboardFrame(true)
            this.setKeyboardHologram(true)
            this.setSoundStatus("Audio cue: detected")
            this.setMode("Mode: Object Learning")
            this.setProgress("Keyboard 1 of 6")
            this.setFeedback("Object detected")
            this.setScore("Score: 0/2")
            this.setPrompt("Point at the keyboard")
            this.setAI("AI Coach: A keyboard converts your key presses into computer input.")
            this.setScan("Object recognized: keyboard")
            this.setReticle("◉")
            this.setImpact("Learners understand real objects in context")
            this.setTimer("Time: 00:55")
            this.setUseCase("Use case: object-based learning")
            this.setNextObject("Current object: Keyboard")
            this.setIcons("🔍", "", "")
            this.titleText.text = "Station 1: Keyboard"
            this.welcomeText.text = "This keyboard is an input device used to communicate with a computer."
            this.instructionText.text = "Look closely: keys, layout, and function matter."
            this.setObjectGuide("KEYBOARD", "↘")
        }

        if (this.step === 2) {
            this.setKeyboardFrame(true)
            this.setKeyboardHologram(true)
            this.setSoundStatus("Audio cue: safety alert")
            this.setMode("Mode: Safety Coach")
            this.setProgress("Keyboard 2 of 6")
            this.setFeedback("Safety tip unlocked")
            this.setScore("Score: 0/2")
            this.setPrompt("Check the area around the keyboard")
            this.setAI("AI Coach: Liquids and damaged cables can create safety risks.")
            this.setScan("Scanning for safety risks...")
            this.setReticle("!")
            this.setImpact("Supports safer learning before mistakes happen")
            this.setTimer("Time: 00:50")
            this.setUseCase("Use case: safety training")
            this.setNextObject("Current object: Keyboard")
            this.setIcons("", "⚠️", "")
            this.titleText.text = "Station 2: Safety"
            this.welcomeText.text = "Keep liquids away and check cables before use."
            this.instructionText.text = "Risk: spills, damaged wires, and poor posture."
            this.setObjectGuide("SAFETY CHECK", "↘")
        }

        if (this.step === 3) {
            this.setKeyboardFrame(true)
            this.setKeyboardHologram(true)
            this.setSoundStatus("Audio cue: setup confirmed")
            this.setMode("Mode: Skill Practice")
            this.setProgress("Keyboard 3 of 6")
            this.setFeedback("Correct setup")
            this.setScore("Score: 0/2")
            this.setPrompt("Place hands in a relaxed position")
            this.setAI("AI Coach: Good ergonomics reduces strain and improves accuracy.")
            this.setScan("Guiding hand position...")
            this.setReticle("✓")
            this.setImpact("Turns instruction into guided physical practice")
            this.setTimer("Time: 00:45")
            this.setUseCase("Use case: guided practice")
            this.setNextObject("Current object: Keyboard")
            this.setIcons("", "", "✅")
            this.titleText.text = "Station 3: Action"
            this.welcomeText.text = "Place the keyboard flat and keep your wrists relaxed."
            this.instructionText.text = "Good setup improves speed, comfort, and accuracy."
            this.setObjectGuide("GOOD SETUP", "↘")
        }

        if (this.step === 4) {
            this.setKeyboardFrame(true)
            this.setKeyboardHologram(true)
            this.setSoundStatus("Audio cue: answer prompt")
            this.setMode("Mode: Knowledge Check")
            this.setProgress("Keyboard 4 of 6")
            this.setFeedback("Choose an answer")
            this.setScore("Score: 0/2")
            this.setPrompt("Tap once to select A")
            this.setAI("AI Coach: Think about what a keyboard sends to a computer.")
            this.setAnswerStatus("Waiting for answer")
            this.setScan("Checking understanding...")
            this.setReticle("?")
            this.setImpact("Checks learning instantly inside the real environment")
            this.setTimer("Time: 00:40")
            this.setUseCase("Use case: quick assessment")
            this.setNextObject("Next object: Monitor")
            this.setIcons("🔍", "", "")
            this.titleText.text = "Quick Quiz"
            this.welcomeText.text = "What is the main purpose of a keyboard?"
            this.instructionText.text = "Choose the best answer below."
            this.setChoice("A) Type commands  |  B) Display images")
            this.setObjectGuide("QUIZ", "↘")
        }

        if (this.step === 5) {
            this.setKeyboardFrame(true)
            this.setKeyboardHologram(true)
            this.setSoundStatus("Audio cue: correct")
            this.setMode("Mode: Answer Verified")
            this.setProgress("Keyboard 5 of 6")
            this.setFeedback("Correct answer selected")
            this.setScore("Score: 1/2")
            this.setPrompt("Answer selected: A")
            this.setAI("AI Coach: Correct. Keyboards send text and commands to the computer.")
            this.setAnswerStatus("Correct: A selected")
            this.setScan("Answer verified")
            this.setReticle("✓")
            this.setImpact("Immediate feedback helps the learner remember")
            this.setTimer("Time: 00:35")
            this.setUseCase("Use case: instant feedback")
            this.setNextObject("Next object: Monitor")
            this.setIcons("", "", "✅")
            this.titleText.text = "Correct"
            this.welcomeText.text = "A keyboard is mainly used to enter text and commands."
            this.instructionText.text = "This confirms the learner understood the object."
            this.setChoice("A) Type commands")
            this.setObjectGuide("VERIFIED", "↘")
        }

        if (this.step === 6) {
            this.setKeyboardFrame(true)
            this.setKeyboardHologram(true)
            this.setSoundStatus("Audio cue: transition")
            this.setMode("Mode: Transition")
            this.setProgress("Keyboard 6 of 6")
            this.setFeedback("Keyboard lesson completed")
            this.setScore("Score: 1/2")
            this.setPrompt("Now point at the monitor")
            this.setAI("AI Coach: Great. Now move to the next object in the workspace.")
            this.setAnswerStatus("Keyboard skill verified")
            this.setScan("Preparing next object scan...")
            this.setReticle("◎")
            this.setImpact("SkillSight AR can guide multiple objects in one workspace")
            this.setTimer("Time: 00:30")
            this.setUseCase("Use case: multi-station training")
            this.setNextObject("Next object: Monitor")
            this.setIcons("🔍", "", "")
            this.titleText.text = "Keyboard Complete"
            this.welcomeText.text = "You completed the keyboard lesson."
            this.instructionText.text = "Tap to begin the monitor lesson."
            this.setObjectGuide("NEXT: MONITOR", "↘")
        }

        if (this.step === 7) {
            this.setScanBeam(true)
            this.setReticleRing(true)
            this.setMonitorVisual(true)
            this.setMonitorFrame(true)
            this.setMonitorHologram(true)
            this.setSoundStatus("Audio cue: detected")
            this.setMode("Mode: Object Learning")
            this.setProgress("Monitor 1 of 6")
            this.setFeedback("Object detected")
            this.setScore("Score: 1/2")
            this.setPrompt("Point at the monitor")
            this.setAI("AI Coach: A monitor displays visual information from the computer.")
            this.setScan("Object recognized: monitor")
            this.setReticle("◉")
            this.setImpact("Learners connect digital output to a real device")
            this.setTimer("Time: 00:25")
            this.setUseCase("Use case: object-based learning")
            this.setNextObject("Current object: Monitor")
            this.setIcons("🔍", "", "")
            this.titleText.text = "Station 2: Monitor"
            this.welcomeText.text = "This monitor is an output device that displays information visually."
            this.instructionText.text = "Look closely: screen height, brightness, and distance matter."
            this.setObjectGuide("MONITOR", "↘")
        }

        if (this.step === 8) {
            this.setMonitorVisual(true)
            this.setMonitorFrame(true)
            this.setMonitorHologram(true)
            this.setSoundStatus("Audio cue: safety alert")
            this.setMode("Mode: Safety Coach")
            this.setProgress("Monitor 2 of 6")
            this.setFeedback("Safety tip unlocked")
            this.setScore("Score: 1/2")
            this.setPrompt("Check monitor height and distance")
            this.setAI("AI Coach: Poor screen position can cause eye strain and neck discomfort.")
            this.setScan("Scanning for ergonomic risks...")
            this.setReticle("!")
            this.setImpact("Teaches safe setup before discomfort happens")
            this.setTimer("Time: 00:20")
            this.setUseCase("Use case: ergonomics training")
            this.setNextObject("Current object: Monitor")
            this.setIcons("", "⚠️", "")
            this.titleText.text = "Monitor Safety"
            this.welcomeText.text = "Keep the screen at eye level and reduce glare."
            this.instructionText.text = "Risk: eye strain, neck strain, and poor posture."
            this.setObjectGuide("ERGONOMICS", "↘")
        }

        if (this.step === 9) {
            this.setMonitorVisual(true)
            this.setMonitorFrame(true)
            this.setMonitorHologram(true)
            this.setSoundStatus("Audio cue: setup confirmed")
            this.setMode("Mode: Skill Practice")
            this.setProgress("Monitor 3 of 6")
            this.setFeedback("Correct setup")
            this.setScore("Score: 1/2")
            this.setPrompt("Adjust your viewing position")
            this.setAI("AI Coach: A good monitor setup improves comfort and focus.")
            this.setScan("Guiding viewing position...")
            this.setReticle("✓")
            this.setImpact("Turns safety advice into visible action")
            this.setTimer("Time: 00:15")
            this.setUseCase("Use case: guided workstation setup")
            this.setNextObject("Current object: Monitor")
            this.setIcons("", "", "✅")
            this.titleText.text = "Monitor Setup"
            this.welcomeText.text = "Place the monitor at a comfortable distance and eye level."
            this.instructionText.text = "Good setup helps reduce strain during long work sessions."
            this.setObjectGuide("GOOD SETUP", "↘")
        }

        if (this.step === 10) {
            this.setMonitorVisual(true)
            this.setMonitorFrame(true)
            this.setMonitorHologram(true)
            this.setSoundStatus("Audio cue: answer prompt")
            this.setMode("Mode: Knowledge Check")
            this.setProgress("Monitor 4 of 6")
            this.setFeedback("Choose an answer")
            this.setScore("Score: 1/2")
            this.setPrompt("Tap once to select A")
            this.setAI("AI Coach: Think about the safest screen position.")
            this.setAnswerStatus("Waiting for answer")
            this.setScan("Checking understanding...")
            this.setReticle("?")
            this.setImpact("Checks ergonomic knowledge instantly")
            this.setTimer("Time: 00:10")
            this.setUseCase("Use case: quick assessment")
            this.setNextObject("Final step: complete lesson")
            this.setIcons("🔍", "", "")
            this.titleText.text = "Monitor Quiz"
            this.welcomeText.text = "What is a good monitor setup?"
            this.instructionText.text = "Choose the best answer below."
            this.setChoice("A) Eye level  |  B) Too close")
            this.setObjectGuide("QUIZ", "↘")
        }

        if (this.step === 11) {
            this.setMonitorVisual(true)
            this.setMonitorFrame(true)
            this.setMonitorHologram(true)
            this.setSoundStatus("Audio cue: correct")
            this.setMode("Mode: Answer Verified")
            this.setProgress("Monitor 5 of 6")
            this.setFeedback("Correct answer selected")
            this.setScore("Score: 2/2")
            this.setPrompt("Answer selected: A")
            this.setAI("AI Coach: Correct. Eye-level positioning helps reduce strain.")
            this.setAnswerStatus("Correct: A selected")
            this.setScan("Answer verified")
            this.setReticle("✓")
            this.setImpact("Immediate feedback improves retention")
            this.setTimer("Time: 00:05")
            this.setUseCase("Use case: instant feedback")
            this.setNextObject("Final step: complete lesson")
            this.setIcons("", "", "✅")
            this.titleText.text = "Correct"
            this.welcomeText.text = "A monitor should be positioned near eye level."
            this.instructionText.text = "This confirms the learner understood safe setup."
            this.setChoice("A) Eye level")
            this.setObjectGuide("VERIFIED", "↘")
        }

        if (this.step === 12) {
            this.setMonitorVisual(true)
            this.setMonitorFrame(true)
            this.setMonitorHologram(true)
            this.setSoundStatus("Audio cue: complete")
            this.setMode("Mode: Completed")
            this.setProgress("Complete")
            this.setFeedback("Full lesson completed")
            this.setScore("Final Score: 2/2")
            this.setPrompt("Ready for another workspace object")
            this.setAI("AI Coach: You completed a multi-object spatial learning session.")
            this.setAnswerStatus("Skills verified")
            this.setScan("All scans complete")
            this.setReticle("✓")
            this.setImpact("SkillSight AR makes real-world learning interactive and scalable")
            this.setTimer("Time: 00:00")
            this.setUseCase("Use case: scalable real-world training")
            this.setNextObject("Lesson complete: Keyboard + Monitor")
            this.setIcons("", "", "✅")
            this.setFinalPitch("XR training for safer, faster, hands-on learning")
            this.setCompletionBadge("✅ SKILL VERIFIED")
            this.titleText.text = "Training Complete"
            this.welcomeText.text = "You completed two real-world AR lessons."
            this.instructionText.text = "Keyboard + Monitor skills verified. Tap to restart."
            this.setObjectGuide("COMPLETE", "↘")
        }
    }
}