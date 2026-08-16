'use client'

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Stepper.module.css'

export interface StepperProps {
  children: ReactNode
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  nextButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  backButtonText?: string
  nextButtonText?: string
  completeButtonText?: string
  disableStepIndicators?: boolean
  renderStepIndicator?: (args: {
    step: number
    currentStep: number
    onStepClick: (step: number) => void
  }) => ReactNode
  /** Si retorna false, no avanza al siguiente paso */
  onBeforeNext?: (currentStep: number) => boolean | Promise<boolean>
  className?: string
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Atrás',
  nextButtonText = 'Continuar',
  completeButtonText = 'Enviar',
  disableStepIndicators = false,
  renderStepIndicator,
  onBeforeNext,
  className = '',
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [direction, setDirection] = useState(0)
  const [busy, setBusy] = useState(false)
  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep)
    if (newStep > totalSteps) onFinalStepCompleted()
    else onStepChange(newStep)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = async () => {
    if (isLastStep) return
    if (onBeforeNext) {
      setBusy(true)
      try {
        const ok = await onBeforeNext(currentStep)
        if (!ok) return
      } finally {
        setBusy(false)
      }
    }
    setDirection(1)
    updateStep(currentStep + 1)
  }

  const handleComplete = async () => {
    if (onBeforeNext) {
      setBusy(true)
      try {
        const ok = await onBeforeNext(currentStep)
        if (!ok) return
      } finally {
        setBusy(false)
      }
    }
    setDirection(1)
    updateStep(totalSteps + 1)
  }

  return (
    <div className={`${styles.outer} ${className}`.trim()} {...rest}>
      <div className={`${styles.circleContainer} ${stepCircleContainerClassName}`.trim()}>
        <div className={`${styles.indicatorRow} ${stepContainerClassName}`.trim()}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1
            const isNotLastStep = index < totalSteps - 1
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1)
                      updateStep(clicked)
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            )
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`${styles.contentDefault} ${contentClassName}`.trim()}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`${styles.footer} ${footerClassName}`.trim()}>
            <div
              className={`${styles.footerNav} ${currentStep !== 1 ? styles.footerNavSpread : styles.footerNavEnd}`}
            >
              {currentStep !== 1 && (
                <button type="button" onClick={handleBack} className={styles.backButton} {...backButtonProps}>
                  {backButtonText}
                </button>
              )}
              <button
                type="button"
                onClick={isLastStep ? handleComplete : handleNext}
                className={styles.nextButton}
                disabled={busy || nextButtonProps.disabled}
                {...nextButtonProps}
              >
                {isLastStep ? completeButtonText : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: {
  isCompleted: boolean
  currentStep: number
  direction: number
  children: ReactNode
  className: string
}) {
  const [parentHeight, setParentHeight] = useState(0)

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: ReactNode
  direction: number
  onHeightReady: (h: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight)
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  )
}

const stepVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-50%' : '50%',
    opacity: 0,
  }),
}

export function Step({ children }: { children: ReactNode }) {
  return <div className={styles.stepDefault}>{children}</div>
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}: {
  step: number
  currentStep: number
  onClickStep: (step: number) => void
  disableStepIndicators: boolean
}) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  return (
    <motion.div
      onClick={() => {
        if (step !== currentStep && !disableStepIndicators) onClickStep(step)
      }}
      className={styles.indicator}
      style={disableStepIndicators ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#334155', color: '#a3a3a3' },
          active: { scale: 1, backgroundColor: '#2563EB', color: '#2563EB' },
          complete: { scale: 1, backgroundColor: '#2563EB', color: '#3b82f6' },
        }}
        transition={{ duration: 0.3 }}
        className={styles.indicatorInner}
      >
        {status === 'complete' ? (
          <CheckIcon className={styles.checkIcon} />
        ) : status === 'active' ? (
          <div className={styles.activeDot} />
        ) : (
          <span className={styles.stepNumber}>{step}</span>
        )}
      </motion.div>
    </motion.div>
  )
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className={styles.connector}>
      <motion.div
        className={styles.connectorInner}
        initial={false}
        animate={
          isComplete
            ? { width: '100%', backgroundColor: '#2563EB' }
            : { width: 0, backgroundColor: 'transparent' }
        }
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
