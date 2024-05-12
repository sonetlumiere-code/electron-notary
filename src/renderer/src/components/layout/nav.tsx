import { DocumentType, MaritalStatus, PersonDataSheet } from '@renderer/types'
import NavItem from './nav-item'

const mockData: PersonDataSheet[] = [
  {
    id: '1',
    name: 'John',
    lastName: 'Doe',
    gender: 'Male',
    nationality: 'American',
    documentType: DocumentType.DNI,
    documentNumber: 12345678,
    CUIT_L: 9876543210,
    birthdate: new Date('1990-01-01'),
    birthplace: 'New York',
    maritalStatus: MaritalStatus.SOLTERO,
    address: '123 Main St',
    city: 'New York City',
    province: 'New York',
    profession: 'Engineer',
    phoneNumber: '555-1234',
    mobileNumber: '555-5678',
    email: 'john.doe@example.com',
    reasonForChoosing: 'Recommended by a friend',
    referredBy: 'Jane Smith'
  },
  {
    id: '2',
    name: 'Alice',
    lastName: 'Smith',
    gender: 'Female',
    nationality: 'British',
    documentType: DocumentType.PASAPORTE,
    documentNumber: 87654321,
    CUIT_L: 1234567890,
    birthdate: new Date('1985-05-15'),
    birthplace: 'London',
    maritalStatus: MaritalStatus.CASADO,
    maritalStatusDetails: {
      spouseName: 'Bob Smith',
      spouseNumber: 2,
      marriageRegime: 'Separación de bienes'
    },
    numberOfChildren: 2,
    address: '456 Elm St',
    city: 'London',
    province: 'Greater London',
    profession: 'Teacher',
    phoneNumber: '555-4321',
    mobileNumber: '555-8765',
    email: 'alice.smith@example.com',
    reasonForChoosing: 'Regular customer',
    isPoliticallyExposed: true,
    politicalPosition: 'Member of Parliament'
  },
  {
    id: '3',
    name: 'Juan',
    lastName: 'Pérez',
    gender: 'Male',
    nationality: 'Argentinian',
    documentType: DocumentType.DNI,
    documentNumber: 13579246,
    CUIT_L: 9876543210,
    birthdate: new Date('1980-08-20'),
    birthplace: 'Buenos Aires',
    maritalStatus: MaritalStatus.DIVORCIADO,
    maritalStatusDetails: {
      divorceNumber: 1,
      divorceDate: new Date('2015-03-10'),
      divorceCourt: 'Tribunal de Familia',
      divorceAutos: 'Case No. 12345'
    },
    numberOfChildren: 1,
    address: '789 Oak St',
    city: 'Buenos Aires',
    province: 'Buenos Aires',
    profession: 'Lawyer',
    phoneNumber: '555-9876',
    mobileNumber: '555-5432',
    email: 'juan.perez@example.com',
    reasonForChoosing: 'Known reputation',
    originOfFunds: 'Salary from legal practice'
  }
]

const Nav = () => {
  return (
    <nav className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        {mockData.map((item) => (
          <NavItem key={item.id} dataSheet={item} />
        ))}
      </div>
    </nav>
  )
}

export default Nav
