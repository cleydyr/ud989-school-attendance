const model = {
	students: [
		{
			name: 'Slappy the Frog',
			attendance: (new Array(12)).fill(false),
		},
		{
			name: 'Lilly the Lizarda',
			attendance: (new Array(12)).fill(false),
		},
		{
			name: 'Paulrus the Walrus',
			attendance: (new Array(12)).fill(false),
		},
		{
			name: 'Gregory the Goat',
			attendance: (new Array(12)).fill(false),
		},
		{
			name: 'Adam the Anaconda',
			attendance: (new Array(12)).fill(false),
		},
	],
	days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

class Octopus {
	constructor(model) {
		this.model = model;
	}

	getDays() {
		return this.model.days;
	}

	getStudents() {
		return this.model.students;
	}

	changeAttendance(i, j) {
		const attendance = this.model.students[i].attendance;
		attendance[j] = !(attendance[j]);
	}
}

const concat = (a, b) => a.concat(b);

class View {
	constructor(octopus) {
		this.octopus = octopus;
	}

	init() {
		const daysHeader = this.octopus.getDays()
			.map(day => `<th>${day}</th>`)
			.reduce(concat, '');
		$('#tableHeadRow')
			.html(`
				<th class="name-col">Student Name</th>
				${daysHeader}
				<th class="missed-col">Days Missed-col</th>
			`);
		this.refresh();
	}

	checkboxChanged(row, col) {
		this.octopus.changeAttendance(row, col);
		this.refresh();
	}

	refresh() {
		const tableBody = this.octopus.getStudents()
			.map((student, studentIndex) => {
				const attendanceMarkup =
					this.octopus.getDays()
						.map((day, dayIndex) => {
							return `
								<td class="attend-col">
									<input
										type="checkbox"
										${student.attendance[dayIndex] ? 'checked' : ''}
										onChange="view.checkboxChanged(${studentIndex}, ${dayIndex})">
								</td>`;
						})
						.reduce(concat, '');

				return `
					<tr class="student">
						<td class="name-col">${student.name}</td>
						${attendanceMarkup}
						<td class="missed-col">${student.attendance.filter(attended => attended).length}</td>
					</tr>
				`;
			})
			.reduce(concat, '');

		$('tbody').html(tableBody);
	}
}

const view = new View(new Octopus(model));
view.init();
