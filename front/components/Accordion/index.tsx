import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import {
  OpenComment,
  ReviewBox,
  ReviewField,
  SummaryAccordion,
} from '../../styles/accordion';
import { NextPage } from 'next';
import { ListItem, Rating } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { toast } from 'react-toastify';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReviewForm from './ReviewForm';

type VariantAccordionType = 'elevation' | 'outlined';

type TextAccordionType = {
  commonCan?: string;
  canText1?: string;
  canText2?: string;
  returns?: string;
  lorem?: string;
  returnsText?: string;
  exchanges?: string;
  customersText1?: string;
  international?: string;
  important?: string;
  custom?: string;
  pleaseText?: string;
};

interface ICustomAccordionPros {
  title: string;
  textArr?: TextAccordionType;
  accordionVariant: VariantAccordionType;
  children?: ReactNode;
  averageRating?: number;
  countReviews?: number;
}

const CustomAccordion: NextPage<ICustomAccordionPros> = ({
  title,
  textArr,
  accordionVariant = 'elevation',
  children,
  averageRating,
  countReviews,
}) => {
  const { t } = useTranslation('accordion');

  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      <Accordion variant={accordionVariant}>
        <SummaryAccordion
          expandIcon={
            expanded ? (
              <AddIcon
                fontSize="large"
                sx={
                  accordionVariant === 'elevation'
                    ? { color: Colors.secondaryWhite }
                    : { color: Colors.darkGray }
                }
              />
            ) : (
              <RemoveIcon
                fontSize="large"
                sx={
                  accordionVariant === 'elevation'
                    ? { color: Colors.secondaryWhite }
                    : { color: Colors.darkGray }
                }
              />
            )
          }
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {title && title === 'Reviews' ? (
            <ReviewBox>
              <Typography
                variant="roboto30300"
                color={
                  accordionVariant === 'elevation'
                    ? Colors.secondaryWhite
                    : Colors.black
                }
              >
                {title} {countReviews !== 0 && `(${countReviews})`}
              </Typography>
              {countReviews !== 0 && averageRating && (
                <Rating
                  name="read-only"
                  value={averageRating}
                  readOnly
                  sx={{ color: Colors.primary, marginRight: '20px' }}
                  size="large"
                />
              )}
            </ReviewBox>
          ) : (
            <Typography
              variant="roboto30300"
              color={
                accordionVariant === 'elevation'
                  ? Colors.secondaryWhite
                  : Colors.black
              }
            >
              {title}
            </Typography>
          )}
        </SummaryAccordion>
        {title && title === 'Reviews' && (
          <AccordionDetails>
            {children}
            <ReviewField>
              {!isOpen && (
                <OpenComment
                  onClick={() =>
                    isAuth
                      ? setIsOpen(!isOpen)
                      : toast.warning('Please Login to add review')
                  }
                >
                  {t('add-review')}
                </OpenComment>
              )}
              {isOpen && <ReviewForm setIsOpen={setIsOpen} />}
            </ReviewField>
          </AccordionDetails>
        )}
        {title && title === 'Delivery' && (
          <AccordionDetails>
            <Typography
              variant="roboto24500"
              component="p"
              sx={{ color: Colors.black, textAlign: 'start' }}
            >
              {t('delivery-propose-standard')}
            </Typography>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography
                variant="roboto24200"
                sx={{ color: Colors.black, textAlign: 'start' }}
              >
                {t('delivery-item-1')}
              </Typography>
            </ListItem>
            <Typography
              variant="roboto24500"
              component="p"
              sx={{ color: Colors.black, textAlign: 'start' }}
            >
              {t('delivery-propose-next-day')}
            </Typography>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography
                variant="roboto24200"
                sx={{ color: Colors.black, textAlign: 'start' }}
              >
                {t('delivery-item-2')}
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography
                variant="roboto24200"
                sx={{ color: Colors.black, textAlign: 'start' }}
              >
                {t('delivery-item-3')}
              </Typography>
            </ListItem>
            <Typography
              variant="roboto24500"
              component="p"
              sx={{
                color: Colors.black,
                textAlign: 'start',
                fontStyle: 'italic',
              }}
            >
              {t('delivery-attention')}
            </Typography>
          </AccordionDetails>
        )}
        <AccordionDetails>
          {textArr && textArr.lorem && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.lorem)}
            </Typography>
          )}
          {textArr && textArr.commonCan && (
            <Typography variant="roboto24500" component="p" marginBottom="30px">
              {t(textArr.commonCan)}
            </Typography>
          )}
          {textArr && textArr.canText1 && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.canText1)}
            </Typography>
          )}
          {textArr && textArr.canText2 && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.canText2)}
            </Typography>
          )}
          {textArr && textArr.returns && (
            <Typography variant="roboto24500" component="p" marginBottom="30px">
              {t(textArr.returns)}
            </Typography>
          )}
          {textArr && textArr.returnsText && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.returnsText)}
            </Typography>
          )}
          {textArr && textArr.exchanges && (
            <Typography variant="roboto24500" component="p" marginBottom="30px">
              {t(textArr.exchanges)}
            </Typography>
          )}
          {textArr && textArr.customersText1 && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.customersText1)}
            </Typography>
          )}
          {textArr && textArr.international && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.international)}
            </Typography>
          )}
          {textArr && textArr.important && (
            <Typography
              variant="roboto24500"
              color={Colors.saleColor}
              component="p"
              marginBottom="30px"
            >
              {t(textArr.important)}
            </Typography>
          )}
          {textArr && textArr.custom && (
            <Typography
              variant="roboto24500"
              color={Colors.saleColor}
              component="p"
              marginBottom="30px"
            >
              {t(textArr.custom)}
            </Typography>
          )}
          {textArr && textArr.pleaseText && (
            <Typography variant="roboto24200" component="p">
              {t(textArr.pleaseText)}
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
