import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '@/components/ConfirmationModal';

describe('ConfirmationModal Component', () => {
  const mockOnConfirm = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultProps = {
    isOpen: true,
    title: 'Confirmar acción',
    message: '¿Estás seguro?',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  it('should render modal when isOpen is true', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    expect(screen.getByText('Confirmar acción')).toBeInTheDocument();
    expect(screen.getByText('¿Estás seguro?')).toBeInTheDocument();
  });

  it('should not render modal when isOpen is false', () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Confirmar acción')).not.toBeInTheDocument();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when cancel button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should display custom button texts', () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        confirmText="Eliminar"
        cancelText="No eliminar"
      />
    );
    
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
    expect(screen.getByText('No eliminar')).toBeInTheDocument();
  });
});
