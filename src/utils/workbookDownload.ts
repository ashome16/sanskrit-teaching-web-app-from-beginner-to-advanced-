import { useAuthStore } from '../store/authStore';
import { canDownloadContent, getDownloadGateReason } from './premiumAccess';

/**
 * Workbook PDFs are for members (paid plan or admin; free trial is blocked, same as
 * worksheet downloads / answer keys). Online page previews stay free for everyone.
 * The PDFs are not linked anywhere in the markup; the file path is only used here
 * after the access check passes.
 */
const MEMBER_PDF_BASE = '/m/2b33f3641bb74081/';

export type WorkbookFile =
  | 'sanskrit-basic-workbook.pdf'
  | 'sanskrit-festival-workbook.pdf'
  | 'sanskrit-grammar-workbook-level-1.pdf'
  | 'sanskrit-grammar-workbook-level-2.pdf'
  | 'sanskrit-grammar-workbook-level-3.pdf'
  | 'sanskrit-animals-workbook.pdf'
  | 'sanskrit-plants-workbook.pdf';

/** Returns true when the download started; otherwise opens the existing sign-in / upgrade prompt. */
export function downloadWorkbook(file: WorkbookFile): boolean {
  const { currentUser, isAdminLoggedIn, openAuthModal, openPaymentModal } = useAuthStore.getState();
  if (!canDownloadContent(currentUser, isAdminLoggedIn)) {
    if (getDownloadGateReason(currentUser, isAdminLoggedIn) === 'guest') openAuthModal('register');
    else openPaymentModal('unlock_paid_features');
    return false;
  }
  const a = document.createElement('a');
  a.href = MEMBER_PDF_BASE + file;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  a.remove();
  return true;
}
