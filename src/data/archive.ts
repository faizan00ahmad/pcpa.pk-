export type ArchiveDoc = { title: string; file: string; year: string };
export type ArchiveGroup = { id: string; title: string; blurb: string; docs: ArchiveDoc[] };

const d = (title: string, file: string, year: string): ArchiveDoc => ({
  title,
  file: `/docs/archive/${file}`,
  year,
});

/** Older documents from the pcpa.pk media library, grouped by topic. */
export const archive: ArchiveGroup[] = [
  {
    id: "election-2026",
    title: "Election 2026-2028",
    blurb: "Provisional voter lists published ahead of the final lists.",
    docs: [
      d("Provisional Eligible Voters List of PCPA 2026-28", "provisional-voters-list-2026-28.pdf", "2026"),
      d(
        "Provisional Eligible Voters List of PCPA Corporate Class Members for the Year 2026-2028",
        "provisional-voters-list-corporate-2026-28.pdf",
        "2026",
      ),
    ],
  },
  {
    id: "election-2020-21",
    title: "Election 2020-21",
    blurb: "",
    docs: [d("Final Election Schedule 2020-21", "final-election-schedule-2020-21.pdf", "2021")],
  },
  {
    id: "election-2019",
    title: "Election 2019",
    blurb: "Schedule, procedure, nominations and results.",
    docs: [
      d("Election Schedule 2019", "election-schedule-2019.pdf", "2019"),
      d("Elections Procedure", "elections-procedure.pdf", "2019"),
      d("Nomination Form for CEC Membership", "nomination-form-cec-membership.pdf", "2019"),
      d("Nominees 2019", "nominees-2019.pdf", "2019"),
      d("List of Candidates 2019", "list-of-candidates-2019.pdf", "2019"),
      d("Provisional Results – Reserve Seat for Women", "provisional-results-reserve-seat-women-2019.pdf", "2019"),
    ],
  },
  {
    id: "membership",
    title: "Membership Forms & Subscription",
    blurb: "Application forms and annual subscription schedules from previous years.",
    docs: [
      d("Annual Subscription of PCPA 2025-2026", "annual-subscription-2025-26.pdf", "2025"),
      d("Membership Application 2025-2026", "membership-application-2025-26.pdf", "2025"),
      d("PCPA Form", "pcpa-form-2024.pdf", "2024"),
      d("PCPA Membership Form", "membership-form-2024.pdf", "2024"),
    ],
  },
  {
    id: "member-lists",
    title: "Member Lists",
    blurb: "Previous Corporate and Associate member directories.",
    docs: [
      d("Corporate PCPA Members for 2024-2025", "corporate-members-2024-25.pdf", "2024"),
      d("Associate PCPA Members for 2024-2025", "associate-members-2024-25.pdf", "2024"),
      d("Members Updated List 2019-20", "members-list-2019-20.pdf", "2020"),
      d("Members Updated List 2019-20 – Corporate", "members-list-2019-20-corporate.pdf", "2020"),
    ],
  },
  {
    id: "office-bearers",
    title: "Office Bearers",
    blurb: "Past office bearer lists. The current list is on the Office Bearers page.",
    docs: [
      d("Office Bearers 2019-2020", "office-bearers-2019-20.pdf", "2020"),
    ],
  },
  {
    id: "laws",
    title: "Laws, Rules & Guidelines",
    blurb: "Reference legislation and good-practice documents for the sector.",
    docs: [
      d("Seed Act 1976", "seed-act-1976.pdf", "1976"),
      d("The Seed (Amendment) Act 2015", "seed-amendment-act-2015.pdf", "2015"),
      d("The Punjab Cotton Control Rules 1966", "punjab-cotton-control-rules-1966.pdf", "1966"),
      d("Seed Production – Good Practice (ISF)", "seed-production-good-practice-isf.pdf", ""),
    ],
  },
];
