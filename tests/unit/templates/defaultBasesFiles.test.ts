import { generateBasesFileTemplate } from '../../../src/templates/defaultBasesFiles';
import { DEFAULT_SETTINGS } from '../../../src/settings/defaults';
import { TaskNotesSettings } from '../../../src/types/settings';

describe('generateBasesFileTemplate', () => {
describe('Calendar time settings', () => {
it('should use user-configured slotMinTime and slotMaxTime for advanced calendar view', () => {
// Create settings with custom calendar times
const customSettings: TaskNotesSettings = {
...DEFAULT_SETTINGS,
calendarViewSettings: {
...DEFAULT_SETTINGS.calendarViewSettings,
slotMinTime: "08:00:00",
slotMaxTime: "20:00:00",
},
};

const template = generateBasesFileTemplate('open-advanced-calendar-view', customSettings);

// Verify the template includes the custom times
expect(template).toContain('slotMinTime: "08:00:00"');
expect(template).toContain('slotMaxTime: "20:00:00"');
});

it('should use default 00:00-24:00 times when using default settings', () => {
const template = generateBasesFileTemplate('open-advanced-calendar-view', DEFAULT_SETTINGS);

// Verify the template includes the default times
expect(template).toContain('slotMinTime: "00:00:00"');
expect(template).toContain('slotMaxTime: "24:00:00"');
});

it('should NOT use hardcoded 06:00-22:00 times', () => {
const template = generateBasesFileTemplate('open-advanced-calendar-view', DEFAULT_SETTINGS);

// Verify the template does NOT include the old hardcoded times
expect(template).not.toContain('slotMinTime: "06:00:00"');
expect(template).not.toContain('slotMaxTime: "22:00:00"');
});

it('should respect extreme time ranges', () => {
// Test with a very narrow time range
const narrowSettings: TaskNotesSettings = {
...DEFAULT_SETTINGS,
calendarViewSettings: {
...DEFAULT_SETTINGS.calendarViewSettings,
slotMinTime: "09:00:00",
slotMaxTime: "17:00:00",
},
};

const template = generateBasesFileTemplate('open-advanced-calendar-view', narrowSettings);

// Verify the template includes the narrow time range
expect(template).toContain('slotMinTime: "09:00:00"');
expect(template).toContain('slotMaxTime: "17:00:00"');
});
});
});
