/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardView } from "./components/DashboardView";
import { AllLeadsView } from "./components/AllLeadsView";
import { CollectLeadsView } from "./components/CollectLeadsView";
import { OutreachView } from "./components/OutreachView";
import { WhatsAppCheckView } from "./components/WhatsAppCheckView";
import { BrandCreatorView } from "./components/BrandCreatorView";
import { WebsiteCreatorView } from "./components/WebsiteCreatorView";
import { SeoAuditView } from "./components/SeoAuditView";
import { AiReceptionistView } from "./components/AiReceptionistView";
import { MeetingView } from "./components/MeetingView";
import { MongoAtlasModal } from "./components/MongoAtlasModal";
import { NewCampaignModal } from "./components/NewCampaignModal";
import { AddLeadModal } from "./components/AddLeadModal";
import { AuthModal } from "./components/AuthModal";
import { AuthScreen } from "./components/AuthScreen";
import { LandingView } from "./components/LandingView";
import { UserProfileSettingsModal } from "./components/UserProfileSettingsModal";
import {
  analyticsApi,
  leadsApi,
  meetingsApi,
  seoApi,
  dbApi,
} from "./services/api";
export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("lead_evo_auth") === "true";
  });
  const [isAuthViewOpen, setIsAuthViewOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState("signup");
  const [isMongoModalOpen, setIsMongoModalOpen] = useState(false);
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [meetingLeadTarget, setMeetingLeadTarget] = useState(void 0);
  const [preselectedOutreachIds, setPreselectedOutreachIds] = useState([]);
  const [user, setUser] = useState({
    id: "usr_elena_01",
    name: "Elena Rostova",
    email: "elena.rostova@leadevo.io",
    role: "Revenue Director",
    company: "Lead Evo Enterprise",
    avatarUrl:
      "[https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90](https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=90)",
    phone: "+1 (415) 892-0419",
    bio: "Scaling outbound pipeline & high-intent B2B conversion engines across US and EMEA enterprise accounts.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles (PST)",
    department: "Revenue & Commercial Growth",
    dailyGoalLeads: 350,
    preferredChannel: "WhatsApp",
    currency: "USD ($)",
    notificationsEnabled: true,
    whatsappAlerts: true,
    meetingAlerts: true,
    apiKey: "evo_live_sec_99a8f27e10b42c67",
  });
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 4820,
    verifiedWhatsApp: 3740,
    highIntent: 1284,
    pipelineValue: 482e3,
    meetingsBooked: 142,
    velocityFunnel: {
      discovered: 15,
      verifiedAndScored: 24,
      inOutreachPipeline: 48,
      won: 13,
      dailyTarget: 350,
      achievedPct: 92,
    },
    outreachMetrics: {
      delivered: 856,
      replied: 32,
      openRate: 94,
      queue: 384,
      readRate: 68.4,
    },
    outreachHealth: {
      healthScore: 78,
      warmPipeline: 35,
      engaged: 43,
      idle: 22,
    },
    engineIntegrations: {
      whatsappApi: { status: "Connected", node: "Cloud Bus", healthy: true },
      domainHealth: { deliverabilityPct: 98.2, healthy: true },
      aiReceptionist: { status: "Standby", latency: "0.4s", healthy: true },
      hubspotSync: { status: "2-way streaming live", healthy: true },
    },
  });
  const [audits, setAudits] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [mongoStatus, setMongoStatus] = useState(null);
  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [analyticsData, leadsData, auditsData, meetingsData] =
        await Promise.all([
          analyticsApi.getRealtime().catch(() => null),
          leadsApi.getAll().catch(() => null),
          seoApi.getHistory().catch(() => null),
          meetingsApi.getAll().catch(() => null),
        ]);
      if (analyticsData?.success) {
        setStats(analyticsData.stats);
        if (analyticsData.mongoStatus) {
          setMongoStatus(analyticsData.mongoStatus);
        }
      }
      if (leadsData?.success) {
        setLeads(leadsData.leads);
      }
      if (auditsData?.success) {
        setAudits(auditsData.audits);
      }
      if (meetingsData?.success) {
        setMeetings(meetingsData.meetings);
      }
    } catch (err) {
      console.warn("API fetch warning, using fallback state:", err);
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpenBookMeeting = (lead) => {
    setMeetingLeadTarget(lead);
    setCurrentTab("meeting");
  };
  const handleLaunchOutreachForLeads = (leadIds) => {
    setPreselectedOutreachIds(leadIds);
    setCurrentTab("outreach");
  };
  const handleAddLead = async (leadData) => {
    try {
      const data = await leadsApi.create(leadData);
      if (data.success) {
        setLeads((prev) => [data.lead, ...prev]);
        setStats((prev) => ({
          ...prev,
          totalLeads: prev.totalLeads + 1,
          highIntent: prev.highIntent + (data.lead.intentScore >= 85 ? 1 : 0),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteLead = async (leadId) => {
    try {
      await leadsApi.delete(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
    } catch (err) {
      console.error(err);
    }
  };
  const handleImportCsv = async () => {
    try {
      const data = await leadsApi.importCsv();
      if (data.success) {
        setLeads((prev) => [...data.leads, ...prev]);
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDispatchWhatsAppBlast = async (params) => {
    try {
      const data = await leadsApi.batchOutreach(params);
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleRunAudit = async (url, targetType) => {
    const data = await seoApi.runAudit(url, targetType);
    if (data.success) {
      setAudits((prev) => [data.audit, ...prev]);
      return data.audit;
    }
    throw new Error("Audit failed");
  };
  const handleBookMeeting = async (meetingData) => {
    try {
      const data = await meetingsApi.book(meetingData);
      if (data.success) {
        setMeetings((prev) => [data.meeting, ...prev]);
        setStats((prev) => ({
          ...prev,
          meetingsBooked: prev.meetingsBooked + 1,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleConnectMongoUri = async (uri) => {
    try {
      const data = await dbApi.connect(uri);
      if (data.status) {
        setMongoStatus(data.status);
      }
      return { success: data.success, message: data.message };
    } catch (err) {
      return {
        success: false,
        message: err?.message || "Database connection error",
      };
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("lead_evo_auth");
    localStorage.removeItem("lead_evo_jwt");
    setIsAuthenticated(false);
    setIsAuthViewOpen(false);
    setCurrentTab("dashboard");
  };
  const handleAuthSuccess = (loggedInUser, token) => {
    setUser(loggedInUser);
    localStorage.setItem("lead_evo_jwt", token);
    localStorage.setItem("lead_evo_auth", "true");
    setIsAuthenticated(true);
    setIsAuthViewOpen(false);
    setCurrentTab("dashboard");
  };
  if (!isAuthenticated) {
    if (isAuthViewOpen || currentTab === "auth") {
      return (
        <AuthScreen
          initialMode={authInitialMode}
          backButtonLabel="Return to Website"
          onAuthSuccess={handleAuthSuccess}
          onBackToPortal={() => {
            setIsAuthViewOpen(false);
            if (currentTab === "auth") setCurrentTab("dashboard");
          }}
        />
      );
    }
    return (
      <LandingView
        onStartFree={() => {
          setAuthInitialMode("signup");
          setIsAuthViewOpen(true);
        }}
        onSignIn={() => {
          setAuthInitialMode("login");
          setIsAuthViewOpen(true);
        }}
        onInstantDemo={() => {
          handleAuthSuccess(user, "demo_token_elena_2026");
        }}
      />
    );
  }
  if (currentTab === "auth") {
    return (
      <AuthScreen
        onAuthSuccess={handleAuthSuccess}
        onBackToPortal={() => setCurrentTab("dashboard")}
      />
    );
  }
  if (currentTab === "meeting") {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#18191E] antialiased selection:bg-amber-200">
        <MeetingView
          leads={leads}
          user={user}
          onBookMeeting={handleBookMeeting}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          preselectedLead={meetingLeadTarget}
          onOpenProfileSettings={() => setIsProfileSettingsOpen(true)}
        />

        {/* Global Modals */}
        {isProfileSettingsOpen && (
          <UserProfileSettingsModal
            user={user}
            onClose={() => setIsProfileSettingsOpen(false)}
            onUpdateUser={(updated) => setUser(updated)}
            onOpenMongoModal={() => setIsMongoModalOpen(true)}
          />
        )}

        {isMongoModalOpen && (
          <MongoAtlasModal
            status={mongoStatus}
            onClose={() => setIsMongoModalOpen(false)}
            onConnectUri={handleConnectMongoUri}
          />
        )}

        {isNewCampaignOpen && (
          <NewCampaignModal
            onClose={() => setIsNewCampaignOpen(false)}
            onLaunch={(camp) => {
              alert(
                `Launched Campaign "${camp.name}" targeting ${camp.targetIndustry} with ${camp.dailyQuota} leads/day!`,
              );
              fetchData();
            }}
          />
        )}

        {isAddLeadOpen && (
          <AddLeadModal
            onClose={() => setIsAddLeadOpen(false)}
            onAddLead={handleAddLead}
          />
        )}

        {isAuthModalOpen && (
          <AuthModal
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={(loggedInUser, token) => {
              setUser(loggedInUser);
              localStorage.setItem("lead_evo_jwt", token);
              alert(
                `Authenticated as ${loggedInUser.name} (${loggedInUser.role})`,
              );
            }}
          />
        )}
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#18191E] antialiased selection:bg-amber-200">
      {/* Primary Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onLogout={handleLogout}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <Header
          user={user}
          onOpenNewCampaign={() => setIsNewCampaignOpen(true)}
          onOpenMongoModal={() => setIsMongoModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenAuthScreen={() => {
            setAuthInitialMode("login");
            setIsAuthViewOpen(true);
          }}
          onLogout={handleLogout}
          onOpenProfileSettings={() => setIsProfileSettingsOpen(true)}
          mongoStatus={mongoStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefreshData={fetchData}
          isRefreshing={isRefreshing}
        />

        {/* Tab View Routing */}
        <main className="flex-1 pb-16">
          {currentTab === "dashboard" && (
            <DashboardView
              stats={stats}
              leads={leads}
              onOpenBookMeeting={handleOpenBookMeeting}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              user={user}
            />
          )}

          {currentTab === "all-leads" && (
            <AllLeadsView
              leads={leads}
              title="Leads & Contacts"
              onOpenAddLead={() => setIsAddLeadOpen(true)}
              onOpenImportCsv={handleImportCsv}
              onOpenBookMeeting={handleOpenBookMeeting}
              onLaunchOutreachForLeads={handleLaunchOutreachForLeads}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {currentTab === "saved" && (
            <AllLeadsView
              leads={leads.filter((l) => l.intentScore >= 85)}
              title="Saved High-Intent Leads"
              onOpenAddLead={() => setIsAddLeadOpen(true)}
              onOpenImportCsv={handleImportCsv}
              onOpenBookMeeting={handleOpenBookMeeting}
              onLaunchOutreachForLeads={handleLaunchOutreachForLeads}
              onDeleteLead={handleDeleteLead}
            />
          )}

          {currentTab === "collect-leads" && (
            <CollectLeadsView
              leads={leads}
              onCollectNewLeads={(newLeads) => {
                setLeads((prev) => [...newLeads, ...prev]);
                setStats((prev) => ({
                  ...prev,
                  totalLeads: prev.totalLeads + newLeads.length,
                  verifiedWhatsApp:
                    prev.verifiedWhatsApp +
                    newLeads.filter((l) => l.whatsappVerified).length,
                  highIntent:
                    prev.highIntent +
                    newLeads.filter((l) => l.intentScore >= 85).length,
                }));
              }}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onLaunchOutreach={handleLaunchOutreachForLeads}
            />
          )}

          {currentTab === "outreach" && (
            <OutreachView
              leads={leads}
              onDispatchBlast={handleDispatchWhatsAppBlast}
              preselectedLeadIds={preselectedOutreachIds}
            />
          )}

          {currentTab === "whatsapp-check" && (
            <WhatsAppCheckView leads={leads} />
          )}

          {currentTab === "brand-creator" && <BrandCreatorView />}

          {currentTab === "website-creator" && <WebsiteCreatorView />}

          {currentTab === "seo-audit" && (
            <SeoAuditView audits={audits} onRunAudit={handleRunAudit} />
          )}

          {currentTab === "ai-receptionist" && <AiReceptionistView />}
        </main>
      </div>

      {/* Global Modals */}
      {isProfileSettingsOpen && (
        <UserProfileSettingsModal
          user={user}
          onClose={() => setIsProfileSettingsOpen(false)}
          onUpdateUser={(updated) => setUser(updated)}
          onOpenMongoModal={() => setIsMongoModalOpen(true)}
        />
      )}

      {isMongoModalOpen && (
        <MongoAtlasModal
          status={mongoStatus}
          onClose={() => setIsMongoModalOpen(false)}
          onConnectUri={handleConnectMongoUri}
        />
      )}

      {isNewCampaignOpen && (
        <NewCampaignModal
          onClose={() => setIsNewCampaignOpen(false)}
          onLaunch={(camp) => {
            alert(
              `Launched Campaign "${camp.name}" targeting ${camp.targetIndustry} with ${camp.dailyQuota} leads/day!`,
            );
            fetchData();
          }}
        />
      )}

      {isAddLeadOpen && (
        <AddLeadModal
          onClose={() => setIsAddLeadOpen(false)}
          onAddLead={handleAddLead}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(loggedInUser, token) => {
            setUser(loggedInUser);
            localStorage.setItem("lead_evo_jwt", token);
            alert(
              `Authenticated as ${loggedInUser.name} (${loggedInUser.role})`,
            );
          }}
        />
      )}
    </div>
  );
}
