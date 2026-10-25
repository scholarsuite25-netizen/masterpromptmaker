# Global CV & Portfolio Engine

For `/create-cv-portfolio`. One command, selectable format/track options, with room for additional formats to be added later without restructuring the command. Applies the Global-Audience Engine by default: internationally legible dates, spelled-out institution names on first use, no unexplained local abbreviations.

## CV/résumé formats (select one; list is extensible; templates in `templates/`)
- **Academic CV** — full chronological record: qualifications, teaching, publications, grants, conference presentations, supervision, professional memberships. Template: `templates/cv_academic.md`.
- **Institutional leadership application CV** — the academic CV elements plus a dedicated administrative/leadership record (roles held, governance experience, committees, strategic initiatives led) and explicit alignment to the vacancy's stated criteria. Default track for senior institutional positions (e.g. Provost, Deputy Provost, Registrar, Vice-Chancellor-type vacancies). Template: `templates/cv_institutional_leadership.md`.
- **Chronological résumé** — reverse-chronological work history, the standard corporate default. Template: `templates/cv_chronological_resume.md`.
- **Functional/skills-based résumé** — organized by skill category rather than job-by-job, suited to career changers or employment gaps. Template: `templates/cv_functional_resume.md`.
- **Combination/hybrid résumé** — skills summary up front, chronological history beneath; the common middle-ground default. Template: `templates/cv_combination_resume.md`.
- **Executive résumé** — leadership-track corporate/private-sector résumé: strategic impact, P&L or scale metrics, board/executive experience (distinct from the institutional-leadership academic track above). Template: `templates/cv_executive.md`.
- **Entry-level/graduate CV** — for candidates with limited work history: education, projects, internships, and transferable skills carry more weight. Template: `templates/cv_entry_level_graduate.md`.
- **Other/special format** — ask what the target format requires (e.g. government/civil-service format, technical/IT-specific format, creative-industry format) rather than forcing it into one of the above; no fixed template.

## Application package (when the CV targets a specific vacancy)
1. Intake the job advert/vacancy announcement if supplied; extract stated criteria, required qualifications, preferred experience, and application instructions.
2. Tailor CV emphasis and a cover/application letter to the advert's stated criteria — reordering and emphasizing the candidate's own real experience, never inventing experience or qualifications to close a gap.
3. For leadership-track applications, include a Statement of Vision/Intent or Candidate's Statement where the vacancy calls for one, built from the candidate's own stated priorities — never fabricated. Template: `templates/vision_statement.md`.
4. Referee list: names and contact details only if supplied by the user; flag `[INPUT REQUIRED]` otherwise, never invent a referee. Template: `templates/referee_list.md`.
5. Cover/application letter — tailored to the advert's stated criteria. Template: `templates/cover_letter.md`.

## Portfolio track (both selectable, may be produced together)
- **Portfolio website** — hand off to the Landing Page Engine (single-page portfolio) or the Global Web Application Factory Engine (multi-page/interactive portfolio), as fits scope.
- **Portfolio document** — curated work samples, case studies, and credentials as a PDF/deck, structured for print or digital viewing. Template: `templates/portfolio_document.md`.

## Never
- Fabricate qualifications, credentials, publications, dates, employment history, achievements/metrics, or referee details not supplied by the user.
- Misrepresent actual experience to better match a job advert's criteria.
- Invent a vacancy's criteria not present in the supplied advert.

Apply the Editorial Naturalness Engine's prose standard by default.
