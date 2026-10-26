export const committeeTitle = "PAKISTAN CROP PROTECTION ASSOCIATION";
export const committeeSubtitle = "FINAL EXECUTIVE COMMITTEE-2019-20 (ELECTION 2019)";

export type Member = {
  sr: number;
  person: string;
  company: string;
  cls: string;
  designation: string;
  contact: string;
  status: string;
  area: string;
};

const r = (
  sr: number,
  person: string,
  company: string,
  cls: string,
  designation: string,
  contact: string,
  status: string,
  area: string,
): Member => ({ sr, person, company, cls, designation, contact, status, area });

export const committee: Member[] = [
  r(1, "Jamshed Iqbal Cheema", "Auriga Chemicals", "Corporate", "Chairman", "0300-8438340", "NEW", "Lahore"),
  r(2, "Shahid Azeem", "Agrinar Pakistan", "Associate", "Sr.Vice Chairman", "0300-7729199", "NEW", "Multan"),
  r(3, "Shoukat Islam", "Montis Enterprises", "Associate", "Vice Chairman", "0302-8635444", "EXISTING", "Multan"),
  r(4, "Rao Shahid Akhtar", "Saanjh Fertilizere", "Associate", "General Secretary", "0300-8730876", "NEW", "Multan"),
  r(5, "Nasir Shakeel", "Agrolix Chemicals Industry", "Corporate", "Dy.Gen.Secretary", "0300-8681135", "NEW", "BWP"),
  r(6, "Ch. M Ashraf", "Agri Force Chemiclas", "Corporate", "Finance Secretary", "0300-6789088", "NEW", "D.G.K"),
  r(7, "Ch. Khalid Mehmood", "Burhan Agro Chemicals", "Associate", "Sec.Reg/Legal Affairs", "0300-8681017", "NEW", "Multan"),
  r(8, "Dr.Muhammad Shafique", "Suncrop Pesticides", "Corporate", "Member", "0300-6789000", "NEW", "Multan"),
  r(9, "Haji Atta-ur-Rehman", "Warble (Pvt) Ltd", "Corporate", "Member", "0300-8639191", "NEW", "Multan"),
  r(10, "Asif Majeed", "Kanzo AG", "Corporate", "Member", "0300-8638282", "NEW", "Multan"),
  r(11, "Saad Akbar Khan", "Pak China Chemicals", "Corporate", "Member", "0300-8469967", "NEW", "Lahore"),
  r(12, "Shahid Salim Qureshi", "Four Brothers Agro Services", "Associate", "Member", "0321-4002626", "NEW", "Lahore"),
  r(13, "Amjad Hussain", "Statndard Crop Sciences", "Associate", "Member", "0300-6727909", "NEW", "R.Y.K"),
  r(14, "Mian M Arshad", "Nice International", "Associate", "Member", "0300-8633574", "NEW", "Multan"),
  r(15, "Ahmed Yar Bhatti", "EON Bio Sciences", "Associate", "Member", "0300-8733889", "NEW", "Multan"),
  r(16, "Hammad Ahmed Mian", "Fertisciences", "Associate", "Member", "0300-2225169", "NEW", "Multan"),
  r(17, "Dr.Khalid Hameed", "Tara Crop Sciences", "Corporate", "Member", "0321-7003388", "EXISTING", "Lahore"),
  r(18, "Dr Abdul Sattar Shahid", "Welcare Chemicals Corportation", "Corporate", "Member", "0300-9695404", "EXISTING", "Sahiwal"),
  r(19, "Faisal Arshad", "Alnoor Agro Chemicals", "Corporate", "Member", "0345-3913333", "EXISTING", "BWP"),
  r(20, "Ch.Altaf Shahid", "Advance Agro Tech", "Corporate", "Member", "0300-8632222", "EXISTING", "Multan"),
  r(21, "Khawaja Riaz Ahmed", "Nuchem (Pvt) Ltd", "Associate", "Member", "0343-3336000", "EXISTING", "Multan"),
  r(22, "M Azam Cheema", "Comega Life Sciences (Pvt) Ltd", "Associate", "Member", "0300-8438336", "EXISTING", "Lahore"),
  r(23, "Khalid Mehmood Warraich", "Glee International", "Corporate", "Member", "0300-8686036", "EXISTING", "BWP"),
  r(24, "Mujahid Zaidi", "M I Corporation", "Corporate", "Member", "0300-8734747", "EXISTING", "Multan"),
  r(25, "Bilal Fazal", "Agro Chem Enterprises", "Associate", "Member", "0300-8673523", "EXISTING", "Multan"),
  r(26, "Jabbar Ahmed", "Saver Enterprises", "Associate", "Member", "0300-6569434", "EXISTING", "FSD"),
  r(27, "Mian Mushtaq Ahmed", "Target Agro Chemicals", "Associate", "Member", "0321-4435529", "EXISTING", "Lahore"),
  r(28, "Rauf-ur-Rehman", "Agri Future Enterprises", "Associate", "Member", "0300-6879211", "EXISTING", "Lahore"),
  r(29, "Mian Hanif Tariq", "Exin Chemicals", "Corporate", "Member", "0300-8636036", "EXISTING", "Multan"),
  r(30, "Haji Abdul Sattar", "Abdullah Haseeb Agro Chemicals", "Corporate", "Member", "0300-6789513", "EXISTING", "D.G.K"),
  r(31, "M Arif Sheikh", "Cropland & Seeds Chemicals", "Associate", "Ex-Chairman", "0300-8687237", "", "BWP"),
];
