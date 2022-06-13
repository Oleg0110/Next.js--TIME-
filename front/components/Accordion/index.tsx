import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from 'next-i18next';
import { Colors } from '../../styles/theme';
import { SummaryAccordion } from '../../styles/accordion';

type TitleAccordionType =
  | 'sizing'
  | 'about-shoes'
  | 'notice'
  | 'retailer'
  | 'shipping'
  | 'returns-exchange'
  | 'common'
  | 'delivery'
  | 'contact-us'
  | 'reviews';

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
  title: TitleAccordionType;
  textArr?: TextAccordionType;
  accordionVariant: VariantAccordionType;
}

const CustomAccordion: React.FC<ICustomAccordionPros> = ({
  title,
  textArr,
  accordionVariant = 'elevation',
}) => {
  const { t } = useTranslation('accordion');
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <Accordion variant={accordionVariant}>
        <SummaryAccordion
          expandIcon={
            expanded ? (
              <AddIcon
                fontSize="large"
                style={{ color: `${Colors.secondaryWhite}` }}
              />
            ) : (
              <RemoveIcon
                fontSize="large"
                style={{ color: `${Colors.secondaryWhite}` }}
              />
            )
          }
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
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
        </SummaryAccordion>
        <AccordionDetails>
          {textArr.lorem && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.lorem)}
            </Typography>
          )}
          {textArr.commonCan && (
            <Typography variant="roboto24500" component="p" marginBottom="30px">
              {t(textArr.commonCan)}
            </Typography>
          )}
          {textArr.canText1 && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.canText1)}
            </Typography>
          )}
          {textArr.canText2 && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.canText2)}
            </Typography>
          )}
          {textArr.returns && (
            <Typography variant="roboto24500" component="p" marginBottom="30px">
              {t(textArr.returns)}
            </Typography>
          )}
          {textArr.returnsText && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.returnsText)}
            </Typography>
          )}
          {textArr.exchanges && (
            <Typography variant="roboto24500" component="p" marginBottom="30px">
              {t(textArr.exchanges)}
            </Typography>
          )}
          {textArr.customersText1 && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.customersText1)}
            </Typography>
          )}
          {textArr.international && (
            <Typography variant="roboto24200" component="p" marginBottom="30px">
              {t(textArr.international)}
            </Typography>
          )}
          {textArr.important && (
            <Typography
              variant="roboto24500"
              color={Colors.saleColor}
              component="p"
              marginBottom="30px"
            >
              {t(textArr.important)}
            </Typography>
          )}
          {textArr.custom && (
            <Typography
              variant="roboto24500"
              color={Colors.saleColor}
              component="p"
              marginBottom="30px"
            >
              {t(textArr.custom)}
            </Typography>
          )}
          {textArr.pleaseText && (
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
