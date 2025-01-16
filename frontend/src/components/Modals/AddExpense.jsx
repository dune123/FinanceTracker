import React from 'react'
import {Button,Modal,Form,Input,DatePicker,Select } from 'antd'

const AddExpense = ({isExpenseModalVissible,handleExpenseCancel,onFinish}) => {

  const [form]=Form.useForm();

  return (
    <Modal
      className='font-semibold'
      title="Add Expense"
      visible={isExpenseModalVissible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values)=>{
          onFinish(values,"expense");
          form.resetFields();
        }}
      >
        <Form.Item
          className='font-semibold'
          label='Name'
          name="name"
          rules={[
            {
              required:true,
              message:"Please input the name of the transaction!"
            }
          ]}
        >
          <Input type='text' className='custom-input'/>
        </Form.Item>
        <Form.Item
          className='font-semibold'
          label="Amount"
          name="amount"
          rules={[
            { required:true, message:"Please input the expense amount!"}
          ]}
        >
          <Input type="number" className='custom-input'/>
        </Form.Item>
        <Form.Item
          className='font-semibold'
          label="Date"
          name="date" 
          rules={[
            { required: true, message: "Please select the expense date!" }
            ]}
        >
        <DatePicker className='custom-input' format='YYYY-MM-DD' />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          className=' font-semibold'
          rules={[{required:true,message:"Please  select a tag!"}]}
        >
            <Select className='select-input-2'>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="office">Office</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>
          <Button className='btn btn-blue' type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddExpense