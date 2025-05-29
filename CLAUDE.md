# Incident Management ROI Calculator

## Project Overview
A React-based ROI calculator designed to help potential customers understand the value of incident management platforms like incident.io. The calculator demonstrates cost savings through reduced downtime, improved engineering efficiency, and better incident response processes.

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3.4.0
- **Fonts**: Inter and DM Sans from Google Fonts
- **Deployment**: Vercel
- **Repository**: https://github.com/twentworth12/im-calc

## Design System
- **Color Scheme**: incident.io's "Alarmalade" orange (#F25533) with cream/white backgrounds
- **Typography**: Sentence case only (first word capitalized)
- **Style**: Clean, modern SaaS aesthetic matching incident.io's design
- **Layout**: Professional header/footer with incident.io branding

## ROI Model
Based on real incident.io customer case studies and research:
- **98% incident noise reduction** (230-250 alerts → 2-5 real incidents)
- **50% MTTR reduction** (Forrester AIOps study)
- **Documentation savings**: 2 hours per incident automation
- **Communication overhead**: 30% reduction in coordination time
- **Cognitive load**: 50% reduction in context switching costs
- **Customer retention**: 5% improvement from better reliability

## Development Guidelines
- **Conservative estimates**: Use research-backed, credible projections
- **Sentence case**: All text should be sentence case, not title case
- **Inter font**: Primary typography should use Inter font family
- **incident.io branding**: Maintain consistent look/feel with incident.io
- **Real data**: Reference actual case studies and Forrester research

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Features
1. **Input form**: 5 key incident metrics (frequency, downtime, engineers, costs)
2. **ROI calculation**: Real-time cost analysis with improvements
3. **Detailed explanation**: Shows methodology and case study data
4. **Professional UI**: incident.io-style header, footer, and branding
5. **Mobile responsive**: Works on all screen sizes

## Deployment
- **Live URL**: https://im-calc-ten.vercel.app/
- **Auto-deploy**: Pushes to main branch trigger Vercel rebuilds
- **Build config**: Configured in vercel.json

## Important Notes
- Keep ROI projections realistic and research-backed
- Maintain incident.io design consistency
- Use sentence case for all text
- Reference real customer case studies for credibility
- Focus on conservative, believable savings calculations

## Recent Improvements
- Enhanced ROI model with real incident.io customer data
- Added incident.io-style header and footer components
- Implemented research-backed improvement percentages
- Updated typography to match modern SaaS standards
- Added comprehensive explanation of calculation methodology