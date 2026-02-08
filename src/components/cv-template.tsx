import type { Profile } from '@/app/page';
import {
  complementaryEducation,
  contact,
  education,
  experience,
  name,
  skills,
  summaries,
  titles,
} from '@/lib/data';
import { Linkedin, Mail, Phone } from 'lucide-react';

interface CVTemplateProps {
  profile: Profile;
}

const CVSection: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => (
  <div className={`mb-6 break-inside-avoid ${className}`}>
    <h2 className="text-xl font-bold text-primary border-b-2 border-primary/40 pb-1 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

export default function CVTemplate({ profile }: CVTemplateProps) {
  const experiencesToShow = experience[profile];
  const complementaryToShow = complementaryEducation[profile];
  const isCommunicator = profile === 'comunicacion';
  const skillsToShow = skills[profile];

  return (
    <div
      id={`cv-template-${profile}`}
      className="absolute -left-[9999px] top-auto w-[8.27in] bg-[#1d201d] text-gray-200 p-10 font-body text-[12pt]"
      style={{ fontFamily: 'var(--font-alegreya)' }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold font-headline text-white">{name}</h1>
          <p className="text-xl text-primary mt-1">{titles[profile]}</p>
        </header>

        {/* Contact Info */}
        <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-primary" />
            <span>linkedin.com/in/pabloblazquezgil</span>
          </div>
        </div>

        {/* Summary */}
        <CVSection title="Perfil Profesional">
          <p className="text-sm leading-relaxed text-justify">
            {summaries[profile]}
          </p>
        </CVSection>

        {/* Experience */}
        <CVSection title="Experiencia Profesional">
          {experiencesToShow.map(expCategory => (
            <div key={expCategory.category} className="space-y-4">
              {expCategory.items.map((item, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <p className="text-base font-bold text-accent">
                      {item.role}
                    </p>
                    <p className="text-gray-400 font-normal text-sm">
                      {item.period}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-300 text-sm">
                    {item.company}
                    {item.details && (
                      <span className="font-normal italic">
                        {' '}
                        - {item.details}
                      </span>
                    )}
                  </p>
                  <p className="text-sm mt-1 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </CVSection>
        
        <CVSection title="Formación">
          <div className="space-y-4">
            {!isCommunicator && (
                <div className="space-y-3 mb-4">
                  {education.map((item, index) => (
                      <div key={index} className="flex justify-between items-baseline break-inside-avoid">
                          <div>
                              <p className="font-bold text-base">{item.degree}</p>
                              <p className="text-gray-400 text-sm">{item.institution}</p>
                          </div>
                          <p className="text-accent font-semibold text-sm">{item.year}</p>
                      </div>
                  ))}
                </div>
            )}
            <h3 className="text-lg font-bold text-accent pt-2 border-t border-gray-700/50">
                Formación Complementaria
            </h3>
            <div className="space-y-3">
                {complementaryToShow.map((item, index) => (
                <div key={index} className="flex justify-between items-start break-inside-avoid">
                    <p className="pr-4 text-sm">
                    {item.title}
                    {item.institution && (
                        <span className="text-gray-400 text-xs">
                        ({item.institution})
                        </span>
                    )}
                    </p>
                    <p className="text-accent font-semibold text-sm shrink-0">
                    {item.year}
                    </p>
                </div>
                ))}
            </div>
          </div>
        </CVSection>

        <CVSection title="Competencias y Aptitudes">
            <div className="space-y-4 text-sm">
              {skillsToShow && (
                  <div className="break-inside-avoid">
                      <h3 className="font-bold text-accent mb-2 text-base">Técnicas</h3>
                      <p className="text-gray-300">{skillsToShow.technical.join(' • ')}</p>
                  </div>
              )}
              <div className="break-inside-avoid">
                  <h3 className="font-bold text-accent mb-2 text-base mt-2">Personales</h3>
                   <p className="text-gray-300">{skills.personal.join(' • ')}</p>
              </div>
              <div className="break-inside-avoid">
                  <h3 className="font-bold text-accent mb-2 text-base mt-2">Idiomas</h3>
                  <div className="space-y-1">
                    {skills.languages.map((lang, i) => (
                        <div key={i} className="flex items-baseline break-inside-avoid">
                          <p className="font-semibold w-28 text-gray-300">{lang.lang}:</p>
                          <p className="text-gray-300">{lang.level}</p>
                        </div>
                    ))}
                  </div>
              </div>
            </div>
        </CVSection>
      </div>
    </div>
  );
}
