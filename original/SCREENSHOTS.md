# MedusaProject - UI Screenshots & Visual Guide

> **Note:** Since this is a desktop application being developed in a headless environment, actual screenshots will be captured after running the application locally.

## 🎨 Expected UI Flow

### Step 1: Server Configuration
**Screen:** Server connection setup
- Two input fields for IP address and domain
- SSH key detection indicator
- "Connect" button with loading state
- Success/error feedback messages
- Modern card-based layout with blue accent colors

**Visual Elements:**
- Server icon (blue)
- Input validation feedback
- Connection status indicator (green checkmark when connected)

### Step 2: Store Identity
**Screen:** Basic store information
- Text input for store name
- Text input for slogan
- Live preview of entered information
- Navigation buttons (Back/Continue)
- Purple accent colors

**Visual Elements:**
- Store icon (purple)
- Preview card showing how the name and slogan will appear
- Clear typography hierarchy

### Step 3: Design Schools
**Screen:** Visual design selection
- Grid of 10 design school cards (3 columns on desktop)
- Each card shows:
  - Visual preview (gradient/style representation)
  - School name
  - Description
  - Color palette (3 color swatches)
  - Checkmark when selected
- Pink accent colors

**Design Schools:**
1. **Glassmorphism** - Translucent glass effects
2. **Material Design 3** - Modern Google design with vibrant colors
3. **Neumorphism** - Soft shadows and extrusions
4. **Brutalism** - Bold contrasts and stark design
5. **Nordic Minimalism** - Neutral tones and generous spacing
6. **Luxury** - Elegant with gold and black
7. **Cyberpunk** - Neon vibrancy and futuristic
8. **Bento Grid** - Modular grid layout
9. **Retro/Vintage** - Warm nostalgic colors
10. **Claymorphism** - Soft 3D clay textures

### Step 4: Theme Customization
**Screen:** Color and typography customization
- Three color pickers:
  - Primary color (buttons and highlights)
  - Secondary color (links and accents)
  - Background color
- Font pair selection (5 options)
- Live preview section showing the theme applied
- Indigo accent colors

**Visual Elements:**
- Large color input squares
- Font preview samples
- Real-time preview of store header

### Step 5: Payment Configuration (NEW!)
**Screen:** Mercado Pago setup
- Test mode toggle with warning banner (yellow)
- Token input field with show/hide toggle
- "Test Connection" button
- Webhook URL preview with domain
- Information cards explaining the process
- Green accent colors

**Visual Elements:**
- Credit card icon (green)
- Secure input with eye icon toggle
- Success/error validation badges
- Webhook configuration instructions

### Step 6: Products Upload
**Screen:** CSV file selection
- File upload area (drag & drop or click)
- CSV format instructions with field descriptions
- Preview table showing first 5 products
- Upload statistics (product count)
- "Select another file" option
- Orange accent colors

**Visual Elements:**
- Package/box icon (orange)
- Data table with clean typography
- File format documentation card

### Step 7: Images Selection
**Screen:** Image directory selection
- Directory selection button
- Folder structure explanation diagram
- Summary statistics in colored cards:
  - Products with images (blue)
  - Products without images (yellow)
  - Total images (purple)
- Detailed mapping table
- Warning messages for missing/orphan folders
- Cyan accent colors

**Visual Elements:**
- Image icon (cyan)
- Statistics cards with large numbers
- Detailed mapping table with status badges
- Clear visual hierarchy

### Step 8: Deployment
**Screen:** Deployment execution
- Configuration summary card
- "Start Deployment" button (large, prominent)
- Terminal/console log viewer (dark theme)
- Real-time log streaming
- Progress indicators
- Status badges (deploying/success/error)
- Blue accent colors

**Visual Elements:**
- Rocket icon (blue)
- Dark terminal with monospace font
- Colored log messages (emoji prefixes)
- Loading spinners
- Status badges

### Step 9: Completion
**Screen:** Success and next steps
- Large success icon (green checkmark)
- Congratulatory message
- Three main action cards:
  - Store URL (blue gradient)
  - Admin panel URL (purple gradient)
  - Webhook URL (green gradient)
- Each with "Open" and "Copy" buttons
- Deployment summary statistics
- Next steps checklist
- "Visit Store" and "New Deployment" buttons

**Visual Elements:**
- Celebration icon
- Gradient cards for different URLs
- Copy-to-clipboard buttons
- Action buttons with icons
- Information cards

## 🎭 Design System

### Colors
- **Primary Blue**: `#3b82f6` - Server, deployment
- **Purple**: `#8b5cf6` - Identity
- **Pink**: `#ec4899` - Design selection
- **Indigo**: `#6366f1` - Theme customization
- **Green**: `#10b981` - Payment, success
- **Orange**: `#f97316` - Products
- **Cyan**: `#06b6d4` - Images

### Typography
- **Headings**: Bold, large (2xl-3xl)
- **Body**: Regular, readable (base-sm)
- **Code/Mono**: Monospace for technical info
- **Icons**: Lucide React, size 20-24px

### Layout
- **Max width**: 1400px (varies by step)
- **Card style**: White background, rounded-lg, shadow-lg
- **Spacing**: Generous padding (p-6 to p-8)
- **Grid**: Responsive (1-3 columns based on screen size)

### Interactions
- **Hover effects**: Slight scale, color shift
- **Loading states**: Spinning icon, disabled buttons
- **Transitions**: Smooth, fast (200-300ms)
- **Feedback**: Toast-like messages, inline validation

## 📱 Responsive Design

All screens adapt to different viewport sizes:
- **Desktop** (1400px+): Full layout, 3-column grids
- **Tablet** (768-1399px): 2-column grids, adjusted spacing
- **Mobile** (< 768px): Single column, stacked layout

## 🎯 User Experience Highlights

1. **Progressive Disclosure**: Information revealed step-by-step
2. **Visual Feedback**: Immediate response to all actions
3. **Error Prevention**: Validation before advancing
4. **Helpful Guidance**: Instructions and examples throughout
5. **Status Visibility**: Always clear where you are in the process

## 🖼️ To Capture Screenshots

Run the application locally:

```bash
npm run dev
```

Then capture:
1. Initial server configuration screen
2. Each wizard step (1-9)
3. Error states
4. Success state
5. Loading states
6. Responsive layouts (different screen sizes)

---

**Note:** All UI components are fully functional and can be tested by running `npm run dev`. The application uses modern React practices with hooks and context for state management.
