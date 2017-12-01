import Todo from './todo';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

configure ({ adapter: new Adapter() });

test('Todo component renders the text of the todo', () => {
	const todo = { id: 1, done: false, name: 'Finish final project' };
	const wrapper = mount(
		<Todo todo={todo} />
	);

	const p = wrapper.find('.toggle-todo');
	console.log(p.text());
	expect(p.text()).toBe('Finish final project');
})

test('Todo calls doneChange when todo is clicked', () => {
	const doneChange = jest.fn()
	const todo = { id: 1, done: false, name: 'Take out trash' };
	const wrapper = mount(
		<Todo todo={todo} doneChange={doneChange} />
	);

	const p = wrapper.find('.toggle-todo');

	p.simulate('click');

	expect(doneChange).toBeCalledWith(1);
})

describe('Todo component renders the todo correctly', () => {
	it('renders correctly', () => {
		const todo = { id: 1, done: false, name: 'Take out trash' };
		const rendered = renderer.create(
			<Todo todo={todo} />
		);

		expect(rendered.toJSON()).toMatchSnapshot();
	})
})
