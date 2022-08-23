import React from 'react';
import { CircularProgress, Modal, Typography } from '@mui/material';
import { Colors } from '../../styles/theme';
import { NextPage } from 'next';
import { AppointModalBox, OptionsAppointBox } from '../../styles/modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toast } from 'react-toastify';
import {
  removeAssignmentAdmin,
  userAssignment,
} from '../../store/services/UserService';
import { useTranslation } from 'next-i18next';

interface IChangeUserStatusModal {
  isModalOpened: boolean;
  handleClose: () => void;
  userId: string;
  userName: string;
  userSurname: string;
  userRole: string;
}

const ChangeUserStatusModal: NextPage<IChangeUserStatusModal> = ({
  isModalOpened,
  handleClose,
  userId,
  userName,
  userSurname,
  userRole,
}) => {
  const { t } = useTranslation('office');

  const dispatch = useAppDispatch();

  const { isLoadingAssign } = useAppSelector((state) => state.user);

  return (
    <>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AppointModalBox>
          <Typography
            variant="roboto24200"
            sx={{
              textAlign: 'center',
              color: Colors.primary,
              marginBottom: '20px',
            }}
          >
            {userRole === 'user' &&
              `Do you want assign ${userName} ${userSurname} like a Administration`}
            {userRole === 'admin' &&
              `Do you want remove ${userName} ${userSurname} like a Administration`}
          </Typography>
          <OptionsAppointBox>
            {isLoadingAssign ? (
              <CircularProgress
                sx={{ color: Colors.primary, margin: '25px 0px' }}
                disableShrink
                size="25px"
              />
            ) : (
              <>
                <Typography
                  variant="roboto24500hover"
                  sx={{
                    textAlign: 'center',
                    color: Colors.primary,
                    cursor: 'pointer',
                  }}
                  onClick={async () => {
                    let res;

                    if (userRole === 'user') {
                      res = await dispatch(userAssignment(userId));
                    } else if (userRole === 'admin') {
                      res = await dispatch(removeAssignmentAdmin(userId));
                    }

                    if (res.meta.requestStatus === 'rejected') {
                      toast.error('invalid data');
                    } else {
                      toast.success('Successfully');
                      handleClose();
                    }
                  }}
                >
                  {t('yes')}
                </Typography>
                <Typography
                  variant="roboto24500hover"
                  sx={{
                    textAlign: 'center',
                    color: Colors.primary,
                    cursor: 'pointer',
                  }}
                  onClick={handleClose}
                >
                  {t('no')}
                </Typography>
              </>
            )}
          </OptionsAppointBox>
        </AppointModalBox>
      </Modal>
    </>
  );
};

export default ChangeUserStatusModal;
