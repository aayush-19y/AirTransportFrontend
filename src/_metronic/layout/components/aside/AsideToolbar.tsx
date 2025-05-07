import {useAuth} from '../../../../app/modules/auth'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, Search} from '../../../partials'
import {useEffect, useState} from 'react'

const AsideToolbar = () => {
  const {currentUser} = useAuth()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Fetch and parse email from local storage
    const authData = localStorage.getItem('kt-auth-react-v')
    if (authData) {
      try {
        const parsedData = JSON.parse(authData)
        setEmail(parsedData.email || 'No email found')
      } catch (error) {
        console.error('Error parsing auth data:', error)
        setEmail('No email found')
      }
    } else {
      setEmail('No email found')
    }
  }, [])

  return (
    <>
      {/*begin::User*/}
      <div className='aside-user d-flex align-items-sm-center justify-content-center py-5'>
        {/*begin::Symbol*/}
        <div className='symbol symbol-50px'>
          {/* <img src={toAbsoluteUrl('media/avatars/300-1.jpg')} alt='' /> */}
        </div>
        {/*end::Symbol*/}

        {/*begin::Wrapper*/}
        <div className='aside-user-info flex-row-fluid flex-wrap ms-5'>
          {/*begin::Section*/}
          <div className='d-flex'>
            {/*begin::Info*/}
            <div className='flex-grow-1 me-2'>
              {/*begin::Username*/}
              <a href='#' className='text-white text-hover-primary fs-6 fw-bold'>
                {currentUser?.first_name} {currentUser?.last_name}
              </a>
              {/*end::Username*/}

              {/*begin::Description*/}
              <span className='text-gray-600 fw-bold d-block fs-8 mb-1'>
                {email}
              </span>
              {/*end::Description*/}

              {/*begin::Label*/}
              <div className='d-flex align-items-center text-success fs-9'>
                <span className='bullet bullet-dot bg-success me-1'></span>online
              </div>
              {/*end::Label*/}
            </div>
            {/*end::Info*/}

            {/*begin::User menu*/}
            <div className='me-n2'>
              {/*begin::Action*/}
              <a
                href='#'
                className='btn btn-icon btn-sm btn-active-color-primary mt-n2'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-start'
                data-kt-menu-overflow='false'
              >
                <KTIcon iconName='setting-2' className='text-muted fs-1' />
              </a>

              <HeaderUserMenu />
              {/*end::Action*/}
            </div>
            {/*end::User menu*/}
          </div>
          {/*end::Section*/}
        </div>
        {/*end::Wrapper*/}
      </div>
      {/*end::User*/}

      {/*begin::Aside search*/}
      <div className='aside-search py-5'>
        <Search />
      </div>
      {/*end::Aside search*/}
    </>
  )
}

export {AsideToolbar}