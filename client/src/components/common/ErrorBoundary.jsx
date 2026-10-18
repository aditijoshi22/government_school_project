import React from 'react';
import { AlertTriangle, RefreshCw, Home, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { performSafeLogout } from '../../context/AuthContext';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('⚠️ [ErrorBoundary Caught Error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleLogout = () => {
    performSafeLogout();
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      // Auto-detect language from html lang attribute or localStorage
      const lang = typeof document !== 'undefined'
        ? (document.documentElement.lang || localStorage.getItem('i18nextLng') || 'en')
        : 'en';
      const isMr = lang.startsWith('mr');
      const isHi = lang.startsWith('hi');

      const texts = {
        title: isMr
          ? 'काहीतरी चूक झाली'
          : isHi
          ? 'कुछ गलत हो गया'
          : 'Something went wrong',
        desc: isMr
          ? 'हे पृष्ठ दाखवताना अनपेक्षित त्रुटी आली. आपण पृष्ठ पुन्हा लोड करू शकता, मुख्य पृष्ठावर जाऊ शकता किंवा सुरक्षितपणे लॉगआउट करू शकता.'
          : isHi
          ? 'यह पृष्ठ प्रदर्शित करते समय एक अप्रत्याशित त्रुटि हुई। आप पृष्ठ पुनः लोड कर सकते हैं, मुख्य पृष्ठ पर जा सकते हैं, या सुरक्षित रूप से लॉगआउट कर सकते हैं।'
          : 'An unexpected error occurred while displaying this page. You can reload, return home, or safely log out.',
        reload: isMr ? 'पुन्हा लोड करा' : isHi ? 'पुनः लोड करें' : 'Reload',
        home: isMr ? 'मुख्य पृष्ठावर जा' : isHi ? 'मुख्य पृष्ठ पर जाएं' : 'Go to home',
        logout: isMr ? 'लॉगआउट' : isHi ? 'लॉगआउट' : 'Logout',
        technicalDetails: isMr ? 'तांत्रिक माहिती' : isHi ? 'तकनीकी विवरण' : 'Technical Details'
      };

      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {texts.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                {texts.desc}
              </p>
            </div>

            {/* Action Buttons: Reload, Go to Home, Logout */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{texts.reload}</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>{texts.home}</span>
              </button>

              <button
                onClick={this.handleLogout}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{texts.logout}</span>
              </button>
            </div>

            {/* Collapsible Technical Details for Debugging */}
            {this.state.error && (
              <div className="text-left pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={this.toggleDetails}
                  className="flex items-center justify-between w-full text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
                >
                  <span>{texts.technicalDetails}</span>
                  {this.state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {this.state.showDetails && (
                  <div className="mt-3 p-3 bg-slate-950 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-800">
                    <p className="font-bold text-rose-400">{this.state.error?.toString()}</p>
                    {this.state.errorInfo?.componentStack && (
                      <pre className="mt-2 text-slate-400 text-[10px] whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
