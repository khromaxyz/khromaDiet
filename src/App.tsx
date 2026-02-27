import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { PageWrapper } from './components/layout/PageWrapper';
import { ScreenNavPill } from './components/layout/ScreenNavPill';
import { ProfileCreationScreen } from './components/profile/ProfileCreationScreen';
import { ProfileDrawer } from './components/profile/ProfileDrawer';
import { ProfileTriggerButton } from './components/profile/ProfileTriggerButton';
import { DashboardScreen } from './components/screens/dashboard/DashboardScreen';
import { FormScreen } from './components/screens/form/FormScreen';
import { HeroScreen } from './components/screens/hero/HeroScreen';
import { SummaryScreen } from './components/screens/summary/SummaryScreen';
import { formSteps } from './lib/constants/steps';
import { buildProfileSummary } from './lib/profiles/summary';
import {
  clearDraft,
  cloneProfile,
  generateProfileId,
  insertProfileWithLimit,
  isStorageAvailable,
  loadActiveProfileId,
  loadDraft,
  loadProfiles,
  saveActiveProfileId,
  saveDraft,
  saveProfiles,
} from './lib/profiles/storage';
import type { DraftPayload, SharedProfileMeta, UserProfile } from './lib/profiles/types';
import { parseShareState, serializeShareState } from './lib/shareState';
import type { FormData, ScreenId } from './lib/types';
import { useDietForgeStore } from './store/useDietForgeStore';

const transition: Transition = {
  duration: 0.42,
  ease: [0.65, 0, 0.35, 1],
};

const goalTimelineStep =
  formSteps.findIndex((step) => step.id === 'goal_timeline') >= 0
    ? formSteps.findIndex((step) => step.id === 'goal_timeline') + 1
    : formSteps.length;

const ScreenContainer = ({ screen, children }: { screen: ScreenId; children: ReactNode }) => {
  return (
    <motion.div
      key={screen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
      className="screen-frame"
    >
      {children}
    </motion.div>
  );
};

const orderedScreens: ScreenId[] = ['hero', 'form', 'profile_create', 'summary', 'dashboard'];

const cloneValue = <T,>(value: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const createProfileSnapshot = (args: {
  profileId: string;
  name: string;
  avatarId: number;
  formData: FormData;
  results: ReturnType<typeof useDietForgeStore.getState>['results'];
  createdAt: string;
}): UserProfile => {
  const safeResults = args.results;
  if (!safeResults) {
    throw new Error('Resultados indisponíveis para salvar o perfil.');
  }

  const formData = cloneValue(args.formData);
  const results = cloneValue(safeResults);

  return {
    id: args.profileId,
    name: args.name,
    avatarId: args.avatarId,
    createdAt: args.createdAt,
    lastUpdatedAt: args.createdAt,
    objective: formData.goal,
    formData,
    results,
    summary: buildProfileSummary(formData, results),
  };
};

function App() {
  const currentScreen = useDietForgeStore((state) => state.currentScreen);
  const currentStep = useDietForgeStore((state) => state.currentStep);
  const formData = useDietForgeStore((state) => state.formData);
  const precisionPct = useDietForgeStore((state) => state.precisionPct);
  const validationIssues = useDietForgeStore((state) => state.validationIssues);
  const isExamplePreview = useDietForgeStore((state) => state.isExamplePreview);
  const results = useDietForgeStore((state) => state.results);
  const viewMode = useDietForgeStore((state) => state.viewMode);

  const setScreen = useDietForgeStore((state) => state.setScreen);
  const setStep = useDietForgeStore((state) => state.setStep);
  const nextStep = useDietForgeStore((state) => state.nextStep);
  const prevStep = useDietForgeStore((state) => state.prevStep);
  const patchFormData = useDietForgeStore((state) => state.patchFormData);
  const computeResults = useDietForgeStore((state) => state.computeResults);
  const hydrateFromShare = useDietForgeStore((state) => state.hydrateFromShare);
  const openExamplePreview = useDietForgeStore((state) => state.openExamplePreview);
  const restoreFromExamplePreview = useDietForgeStore((state) => state.restoreFromExamplePreview);
  const resetAll = useDietForgeStore((state) => state.resetAll);

  const [storageAvailableState] = useState(() => isStorageAvailable());
  const [profiles, setProfiles] = useState<UserProfile[]>(() => (storageAvailableState ? loadProfiles() : []));
  const [activeProfileId, setActiveProfileId] = useState<string | null>(() =>
    storageAvailableState ? loadActiveProfileId() : null,
  );
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [draftPrompt, setDraftPrompt] = useState<DraftPayload | null>(null);

  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage('');
      toastTimeoutRef.current = null;
    }, 2600);
  }, []);

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? null,
    [activeProfileId, profiles],
  );

  const activeProfileMeta = useMemo<SharedProfileMeta | undefined>(
    () => (activeProfile ? { name: activeProfile.name, avatarId: activeProfile.avatarId } : undefined),
    [activeProfile],
  );

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!storageAvailableState) {
      return;
    }

    saveProfiles(profiles);
  }, [profiles, storageAvailableState]);

  useEffect(() => {
    if (!storageAvailableState) {
      return;
    }

    saveActiveProfileId(activeProfileId);
  }, [activeProfileId, storageAvailableState]);

  useEffect(() => {
    if (activeProfileId && !profiles.some((profile) => profile.id === activeProfileId)) {
      setActiveProfileId(profiles[0]?.id ?? null);
    }
  }, [activeProfileId, profiles]);

  const navigate = useCallback(
    (screen: ScreenId) => {
      if (isExamplePreview && screen !== 'dashboard') {
        restoreFromExamplePreview();
      }

      if (screen === 'summary' || screen === 'dashboard' || screen === 'profile_create') {
        computeResults();
      }

      if (screen === 'form' && currentStep < 1) {
        setStep(1);
      }

      setScreen(screen);
    },
    [computeResults, currentStep, isExamplePreview, restoreFromExamplePreview, setScreen, setStep],
  );

  const openExample = useCallback(() => {
    openExamplePreview();
  }, [openExamplePreview]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const shared = url.searchParams.get('state');

    if (shared) {
      const parsed = parseShareState(shared);
      if (!parsed) {
        return;
      }

      hydrateFromShare({
        formData: parsed.formData,
        currentStep: parsed.currentStep,
        viewMode: parsed.viewMode,
      });

      if (parsed.sharedProfile) {
        showToast('Perfil compartilhado carregado - salve para manter.');
      }

      return;
    }

    if (!storageAvailableState) {
      return;
    }

    const draft = loadDraft();
    if (draft) {
      setDraftPrompt(draft);
    }
  }, [hydrateFromShare, showToast, storageAvailableState]);

  useEffect(() => {
    if (!storageAvailableState || currentScreen !== 'form') {
      return;
    }

    saveDraft({
      formData,
      currentStep,
      updatedAt: new Date().toISOString(),
    });
  }, [currentScreen, currentStep, formData, storageAvailableState]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const currentIndex = orderedScreens.indexOf(currentScreen);

      if (event.key === 'ArrowRight' && currentIndex < orderedScreens.length - 1) {
        const next = orderedScreens[currentIndex + 1];
        if (next) {
          navigate(next);
        }
      }

      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        const previous = orderedScreens[currentIndex - 1];
        if (previous) {
          navigate(previous);
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [currentScreen, navigate]);

  const handleSaveProfile = useCallback(
    (payload: { name: string; avatarId: number; replaceOldest: boolean }) => {
      const store = useDietForgeStore.getState();
      const latestResults = store.results ?? store.computeResults();
      const createdAt = new Date().toISOString();

      const nextProfile = createProfileSnapshot({
        profileId: generateProfileId(),
        name: payload.name,
        avatarId: payload.avatarId,
        formData: store.formData,
        results: latestResults,
        createdAt,
      });

      const insertion = insertProfileWithLimit(profiles, nextProfile, {
        allowReplaceOldest: payload.replaceOldest,
      });

      if (insertion.blockedByLimit) {
        showToast('Limite de perfis atingido. Substitua o perfil mais antigo para continuar.');
        return;
      }

      setProfiles(insertion.profiles);
      setActiveProfileId(nextProfile.id);
      setDraftPrompt(null);
      clearDraft();
      navigate('summary');
    },
    [navigate, profiles, showToast],
  );

  const handleLoadProfile = useCallback(
    async (profileId: string) => {
      const selectedProfile = profiles.find((profile) => profile.id === profileId);
      if (!selectedProfile) {
        return;
      }

      hydrateFromShare({
        formData: cloneValue(selectedProfile.formData),
        currentStep: goalTimelineStep,
        viewMode,
      });

      const refreshed = useDietForgeStore.getState();
      const refreshedResults = refreshed.results ?? refreshed.computeResults();
      const refreshedFormData = refreshed.formData;

      setProfiles((current) =>
        current.map((profile) =>
          profile.id === selectedProfile.id
            ? {
                ...profile,
                formData: cloneValue(refreshedFormData),
                results: cloneValue(refreshedResults),
                summary: buildProfileSummary(refreshedFormData, refreshedResults),
                lastUpdatedAt: new Date().toISOString(),
              }
            : profile,
        ),
      );

      setActiveProfileId(selectedProfile.id);
      setIsProfileDrawerOpen(false);
    },
    [hydrateFromShare, profiles, viewMode],
  );

  const handleRenameProfile = useCallback((profileId: string, name: string) => {
    setProfiles((current) => current.map((profile) => (profile.id === profileId ? { ...profile, name } : profile)));
  }, []);

  const handleChangeProfileAvatar = useCallback((profileId: string, avatarId: number) => {
    setProfiles((current) =>
      current.map((profile) => (profile.id === profileId ? { ...profile, avatarId: Math.max(0, Math.min(11, avatarId)) } : profile)),
    );
  }, []);

  const handleDeleteProfile = useCallback((profileId: string) => {
    setProfiles((current) => {
      const remaining = current.filter((profile) => profile.id !== profileId);
      setActiveProfileId((currentActiveId) => (currentActiveId === profileId ? remaining[0]?.id ?? null : currentActiveId));
      return remaining;
    });
  }, []);

  const handleRecalculateFromProfile = useCallback(
    (profileId: string) => {
      const selectedProfile = profiles.find((profile) => profile.id === profileId);
      if (!selectedProfile) {
        return;
      }

      hydrateFromShare({
        formData: cloneValue(selectedProfile.formData),
        currentStep: goalTimelineStep,
        viewMode,
      });
      setStep(goalTimelineStep);
      setScreen('form');
      setActiveProfileId(selectedProfile.id);
      setIsProfileDrawerOpen(false);
    },
    [hydrateFromShare, profiles, setScreen, setStep, viewMode],
  );

  const handleShareProfile = useCallback(
    async (profileId: string): Promise<boolean> => {
      const selectedProfile = profiles.find((profile) => profile.id === profileId);
      if (!selectedProfile) {
        return false;
      }

      const payload = serializeShareState({
        formData: cloneValue(selectedProfile.formData),
        currentStep: goalTimelineStep,
        viewMode,
        sharedProfile: {
          name: selectedProfile.name,
          avatarId: selectedProfile.avatarId,
        },
      });

      const url = new URL(window.location.href);
      url.searchParams.set('state', payload);

      try {
        await navigator.clipboard.writeText(url.toString());
        showToast('Link de perfil copiado.');
        return true;
      } catch {
        showToast('Falha ao copiar o link.');
        return false;
      }
    },
    [profiles, showToast, viewMode],
  );

  const handleCreateNewProfile = useCallback(() => {
    resetAll();
    setStep(1);
    setScreen('form');
    setIsProfileDrawerOpen(false);
  }, [resetAll, setScreen, setStep]);

  const handleResumeDraft = useCallback(() => {
    if (!draftPrompt) {
      return;
    }

    hydrateFromShare({
      formData: cloneValue(draftPrompt.formData),
      currentStep: draftPrompt.currentStep,
      viewMode,
    });
    setStep(draftPrompt.currentStep);
    setScreen('form');
    setDraftPrompt(null);
  }, [draftPrompt, hydrateFromShare, setScreen, setStep, viewMode]);

  const handleDiscardDraft = useCallback(() => {
    clearDraft();
    setDraftPrompt(null);
  }, []);

  const profileTrigger = (
    <ProfileTriggerButton
      avatarId={activeProfile?.avatarId ?? null}
      onClick={() => setIsProfileDrawerOpen(true)}
      ariaLabel="Abrir painel de perfis"
    />
  );

  return (
    <>
      {!storageAvailableState ? (
        <div className="df-storage-warning" role="status" aria-live="polite">
          Perfis não serão salvos nesta sessão.
        </div>
      ) : null}

      {draftPrompt ? (
        <div className="df-draft-resume-banner" role="dialog" aria-label="Retomar preenchimento">
          <p>Continuar de onde parou?</p>
          <div className="df-draft-resume-actions">
            <button type="button" onClick={handleResumeDraft}>
              Continuar
            </button>
            <button type="button" onClick={handleDiscardDraft}>
              Descartar
            </button>
          </div>
        </div>
      ) : null}

      <ScreenNavPill
        currentScreen={currentScreen}
        currentStep={currentStep}
        totalSteps={formSteps.length}
        onNavigate={navigate}
      />

      <PageWrapper>
        <AnimatePresence mode="wait" initial={false}>
          {currentScreen === 'hero' ? (
            <ScreenContainer screen="hero">
              <HeroScreen onNavigate={navigate} onOpenExample={openExample} />
            </ScreenContainer>
          ) : null}

          {currentScreen === 'form' ? (
            <ScreenContainer screen="form">
              <FormScreen
                step={currentStep}
                data={formData}
                precisionPct={precisionPct}
                issues={validationIssues}
                profileTrigger={profileTrigger}
                onPatch={patchFormData}
                onBackStep={prevStep}
                onNextStep={() => nextStep(formSteps.length)}
                onPrevScreen={() => navigate('hero')}
                onSummary={() => navigate('profile_create')}
                onCompute={() => computeResults().validations}
              />
            </ScreenContainer>
          ) : null}

          {currentScreen === 'profile_create' ? (
            <ScreenContainer screen="profile_create">
              <ProfileCreationScreen
                formData={formData}
                results={results}
                existingProfiles={profiles.map((profile) => cloneProfile(profile))}
                onSave={handleSaveProfile}
                onBack={() => navigate('form')}
              />
            </ScreenContainer>
          ) : null}

          {currentScreen === 'summary' ? (
            <ScreenContainer screen="summary">
              <SummaryScreen active={currentScreen === 'summary'} onNavigate={navigate} />
            </ScreenContainer>
          ) : null}

          {currentScreen === 'dashboard' ? (
            <ScreenContainer screen="dashboard">
              <DashboardScreen
                onNavigate={navigate}
                profileTrigger={profileTrigger}
                {...(activeProfileMeta ? { activeProfileMeta } : {})}
              />
            </ScreenContainer>
          ) : null}
        </AnimatePresence>
      </PageWrapper>

      <ProfileDrawer
        open={isProfileDrawerOpen}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onClose={() => setIsProfileDrawerOpen(false)}
        onCreateNewProfile={handleCreateNewProfile}
        onLoadProfile={handleLoadProfile}
        onRenameProfile={handleRenameProfile}
        onChangeAvatar={handleChangeProfileAvatar}
        onRecalculateProfile={handleRecalculateFromProfile}
        onShareProfile={handleShareProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      {toastMessage ? <div className="df-profile-toast">{toastMessage}</div> : null}
    </>
  );
}

export default App;
