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
  <div className={`mb-4 ${className}`}>
    <h2 className="text-xl font-bold text-primary border-b-2 border-primary/40 pb-1 mb-3">
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
      className="absolute -left-[9999px] top-auto w-[8.27in] min-h-[11.69in] bg-[#1d201d] text-gray-200 p-10 font-body text-sm"
      style={{ fontFamily: 'var(--font-alegreya)' }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold font-headline text-white">{name}</h1>
          <p className="text-xl text-primary mt-1">{titles[profile]}</p>
        </header>

        {/* Contact Info */}
        <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap mb-6 text-xs">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="w-3.5 h-3.5 text-primary" />
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
            <div key={expCategory.category} className="space-y-3">
              {expCategory.items.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <p className="text-base font-bold text-accent">
                      {item.role}
                    </p>
                    <p className="text-gray-400 font-normal text-xs">
                      {item.period}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-300">
                    {item.company}
                    {item.details && (
                      <span className="font-normal italic">
                        {' '}
                        - {item.details}
                      </span>
                    )}
                  </p>
                  <p className="text-xs mt-1 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </CVSection>
        
        <div className="grid grid-cols-2 gap-x-8">
            <div className='space-y-4'>
                <CVSection title="Formación">
                    <div className="space-y-3">
                        {!isCommunicator && (
                            <div className="space-y-2 mb-3">
                            {education.map((item, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div>
                                        <p className="font-bold text-base">{item.degree}</p>
                                        <p className="text-gray-400 text-xs">{item.institution}</p>
                                    </div>
                                    <p className="text-accent font-semibold text-sm">{item.year}</p>
                                </div>
                            ))}
                            </div>
                        )}
                        <h3 className="text-base font-bold text-accent pt-2 border-t border-gray-700/50">
                            Formación Complementaria
                        </h3>
                        <div className="space-y-2">
                            {complementaryToShow.map((item, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <p className="pr-4">
                                {item.title}{' '}
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
            </div>
            <div>
                <CVSection title="Competencias y Aptitudes">
                    <div className="space-y-3 text-xs">
                        {skillsToShow && (
                            <div>
                                <h3 className="font-bold text-accent mb-1 text-sm">Técnicas</h3>
                                <div className="flex flex-wrap gap-1">
                                    {skillsToShow.technical.map((skill, i) => (
                                    <span key={i} className="bg-primary/20 text-primary-foreground/80 rounded px-2 py-0.5">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h3 className="font-bold text-accent mb-1 text-sm mt-2">Personales</h3>
                            <div className="flex flex-wrap gap-1">
                                {skills.personal.map((skill, i) => (
                                <span key={i} className="bg-secondary/20 text-gray-300 rounded px-2 py-0.5">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-accent mb-1 text-sm mt-2">Idiomas</h3>
                            {skills.languages.map((lang, i) => (
                                <p key={i}>
                                <span className="font-semibold">{lang.lang}:</span> {lang.level}
                                </p>
                            ))}
                        </div>
                    </div>
                </CVSection>
            </div>
        </div>
      </div>
    </div>
  );
}
